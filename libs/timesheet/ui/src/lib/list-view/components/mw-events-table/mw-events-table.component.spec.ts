import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwEventsTableComponent } from './mw-events-table.component';

describe('MwEventsTableComponent', () => {
  let component: MwEventsTableComponent;
  let fixture: ComponentFixture<MwEventsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwEventsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwEventsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
