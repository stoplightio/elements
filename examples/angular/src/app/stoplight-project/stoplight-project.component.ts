import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-docs',
  templateUrl: './stoplight-project.component.html',
})
export class StoplightProjectComponent {
  projectId = 'cHJqOjY';
  platformUrl = 'https://x-6195.stoplight-dev.com';
  basePath = environment.basePath ? `${environment.basePath}/stoplight-project` : 'stoplight-project';
}
