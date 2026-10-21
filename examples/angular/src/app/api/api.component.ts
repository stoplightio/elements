import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-api',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './api.component.html',
})
export class ApiComponent {
  apiDescriptionUrl = 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml';
  basePath = 'zoom-api';
}
