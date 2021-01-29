import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
})
export class ApiComponent {
  apiDescriptionUrl = 'https://raw.githubusercontent.com/stoplightio/public-apis/master/reference/zoom/zoom.yaml';
  basePath = environment.basePath ? `${environment.basePath}/reference` : 'reference';
}
