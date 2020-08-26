import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
})
export class DocsComponent {
  constructor(private ngZone: NgZone, private router: Router) {}
}
