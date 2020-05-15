import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  ACCEPTED,
} from 'http-status-codes';
import { MW_EVENTS_MOCK } from './__mocks__/mw-events.mock';
import { MwEventDto } from '@mobile-worker/timesheet/shared/types';
import { getUuid } from '@ngrx/data';
import { now, toDateIfValid } from '@mobile-worker/timesheet/shared/helpers';
import { differenceInDays } from 'date-fns';

const getId = (url: string) => url.split('/').pop();

export class MockBackendInterceptor implements HttpInterceptor {
  MOCK = [...MW_EVENTS_MOCK];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { method, url, body } = req;
    const singular = 'api/mwevent/';
    const plural = 'api/mwevents/';

    if (method === 'GET' && req.url === plural) {
      return this.handleGetAll();
    } else if (method === 'GET' && url.startsWith(singular)) {
      return this.handleGetSingle(url);
    } else if (method === 'PUT' && url.startsWith(singular)) {
      return this.handleUpdate(body);
    } else if (req.method === 'DELETE' && url.startsWith(singular)) {
      return this.handleDelete(req);
    } else if (req.method === 'POST' && url.startsWith(singular)) {
      return this.handleCreate(body);
    }
    return next.handle(req);
  }

  private handleGetAll() {
    return of(new HttpResponse({ status: OK, body: this.MOCK }));
  }

  private handleGetSingle(url: string) {
    const id = getId(url);
    const entity = this.MOCK.find(({ id: _id }) => _id === id);
    if (!entity) {
      return throwError(new HttpErrorResponse({ status: NOT_FOUND }));
    }
    return of(new HttpResponse({ status: OK, body: entity }));
  }

  private handleDelete(req: HttpRequest<any>) {
    const id = getId(req.url);
    if (id) {
      const lengthBefore = this.MOCK.length;
      this.MOCK = this.MOCK.filter(({ id: _id }) => id !== _id);
      if (lengthBefore === this.MOCK.length) {
        return throwError(
          new HttpErrorResponse({
            status: BAD_REQUEST,
            error: "Can't delete non existing entity.",
          })
        );
      }
    } else {
      return throwError(
        new HttpErrorResponse({ error: 'No entity ID provided.' })
      );
    }
    return of(new HttpResponse({ status: OK }));
  }

  private handleCreate(entity: MwEventDto) {
    const error = this.validateEntity(entity);
    if (error) {
      return error;
    }

    const { date: entityDate } = entity;

    const { lastTaskEnd, firstTaskStart, tasksCount } = this.MOCK.find(
      ({ date }) => date === entity.date
    ) || {
      firstTaskStart: `${entityDate} 08:00`,
      lastTaskEnd: `${entityDate} 17:00`,
      tasksCount: 0,
    };

    const newEntity = {
      id: getUuid(),
      ...entity,
      firstTaskStart,
      lastTaskEnd,
      tasksCount: tasksCount + 1,
    };
    this.MOCK = [...this.MOCK, newEntity];
    return of(new HttpResponse({ status: CREATED, body: newEntity }));
  }

  private handleUpdate(entity: MwEventDto) {
    let error = this.validateEntityExists(entity);
    if (error) {
      return error;
    }

    const oldMock = [...this.MOCK];

    this.MOCK = [...this.MOCK.filter(({ id }) => id !== entity.id)];
    error = this.validateEntity(entity);
    if (error) {
      this.MOCK = oldMock;
      return error;
    }

    this.MOCK = [...this.MOCK.filter(({ id }) => id !== entity.id), entity];
    return of(new HttpResponse({ status: ACCEPTED, body: entity }));
  }

  // TODO: separate to smaller methods
  private validateEntity(entity: MwEventDto) {
    const { date: entityDate, eventTypeName: entityEventTypeName } = entity;

    const parsedDate = toDateIfValid(entityDate);

    if (!parsedDate) {
      return throwError(
        new HttpErrorResponse({ status: BAD_REQUEST, error: 'Invalid date.' })
      );
    }

    const diffInDays = differenceInDays(now(), parsedDate);
    if (diffInDays > 7 || diffInDays < 0) {
      return throwError(
        new HttpErrorResponse({
          status: BAD_REQUEST,
          error:
            'Date cannot be earlier than seven days before today or later than today.',
        })
      );
    }

    if (
      this.MOCK.find(
        ({ date, eventTypeName }) =>
          date === entityDate && eventTypeName === entityEventTypeName
      )
    ) {
      /**
       * Check if not trying to enter event with same type in same day.
       * In assignment it is required for event types to be unique in same day.
       * Normally I would implement async validator for it.
       */
      return throwError({
        status: BAD_REQUEST,
        error: 'Event type names cannot repeat in same day.',
      });
    }
  }

  private validateEntityExists(entity: MwEventDto) {
    const oldEntity = this.MOCK.find(({ id }) => id === entity.id);
    if (!oldEntity) {
      return throwError(
        new HttpErrorResponse({
          status: NOT_FOUND,
          error: `Entity (id: ${entity.id}) not found.`,
        })
      );
    }
  }
}
