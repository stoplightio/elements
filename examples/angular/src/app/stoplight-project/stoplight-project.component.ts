import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stoplight-project.component.html',
})
export class StoplightProjectComponent {
  projectId = 'cHJqOjYwNjYx';
  platformUrl = 'https://stoplight.io';
  basePath = 'stoplight-project';
  router = 'history';
}
