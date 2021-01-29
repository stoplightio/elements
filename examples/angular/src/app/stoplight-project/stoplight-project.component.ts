import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-docs',
  templateUrl: './stoplight-project.component.html',
})
export class StoplightProjectComponent {
  workspaceSlug = 'elements';
  projectSlug = 'studio-demo';
  basePath = environment.basePath ? `${environment.basePath}/stoplight-project` : 'stoplight-project';
}
