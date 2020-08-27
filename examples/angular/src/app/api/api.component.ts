import { Component } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
})
export class ApiComponent {
  descriptionUrl = 'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json';
}
