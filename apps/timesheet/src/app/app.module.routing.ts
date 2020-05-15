import { Route, Routes } from '@angular/router';

export type MenuRoute = Route & { title: string };

export const mainMenu: MenuRoute[] = [
  {
    path: 'timesheet',
    title: 'TimeSheet',
    loadChildren: () =>
      import('@mobile-worker/timesheet/ui').then((m) => m.TimesheetModule),
  },
  {
    path: 'table',
    title: 'Table',
    loadChildren: () =>
      import('@mobile-worker/timesheet/ui').then((m) => m.ListViewModule),
  },
];

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: mainMenu[0].path,
  },
  ...mainMenu,
];
