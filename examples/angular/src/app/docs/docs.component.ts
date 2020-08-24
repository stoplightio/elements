import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['../app.component.css'],
})
export class DocsComponent {
  constructor(private ngZone: NgZone, private router: Router) {}
}
