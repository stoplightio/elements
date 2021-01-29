import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
})
export class DocsComponent {
  workspaceSlug = 'elements';
  projectSlug = 'studio-demo';
  basePath = environment.basePath ? `${environment.basePath}/docs` : 'docs';
}
