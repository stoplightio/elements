import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Stoplight Elements - Angular example</h1>
    <p>Pick an example from the navigation above.</p>
  `,
  styles: `
    :host {
      display: block;
      padding: 16px;
    }
  `,
})
export class HomeComponent {}
