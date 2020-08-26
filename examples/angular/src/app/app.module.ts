import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiComponent } from './api/api.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocsComponent } from './docs/docs.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, DocsComponent, ApiComponent],
  imports: [BrowserModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
