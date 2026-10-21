import { Routes } from '@angular/router';

import { ApiComponent } from './api/api.component';
import { HomeComponent } from './home/home.component';
import { StoplightProjectComponent } from './stoplight-project/stoplight-project.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'stoplight-project/**', component: StoplightProjectComponent },
  { path: 'zoom-api/**', component: ApiComponent },
];
