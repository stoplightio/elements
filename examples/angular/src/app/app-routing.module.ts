import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from './api/api.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoplightProjectComponent } from './stoplight-project/stoplight-project.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'stoplight-project',
    component: StoplightProjectComponent,
    children: [{ path: '**', component: StoplightProjectComponent }],
  },
  {
    path: 'zoom-api',
    component: ApiComponent,
    children: [{ path: '**', component: ApiComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  bootstrap: [AppComponent],
})
export class AppRoutingModule {}
