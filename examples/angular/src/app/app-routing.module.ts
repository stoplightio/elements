import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from './api/api.component';
import { AppComponent } from './app.component';
import { DocsComponent } from './docs/docs.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'workspace-docs', component: DocsComponent },
  { path: 'oas-docs', component: ApiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  bootstrap: [AppComponent],
})
export class AppRoutingModule {}
