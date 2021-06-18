import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-docs',
  templateUrl: './stoplight-project.component.html',
})
export class StoplightProjectComponent {
  projectId = 'cHJqOjYwNjYx';
  platformUrl = 'https://stoplight.io';
  basePath = environment.basePath ? `${environment.basePath}/stoplight-project` : 'stoplight-project';
}
