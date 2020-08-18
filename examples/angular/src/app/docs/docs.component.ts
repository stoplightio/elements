import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['../app.component.css'],
})
export class DocsComponent {
  constructor(private ngZone: NgZone, private router: Router) {
    // When the angular router emits a route change event, update the Hub uri
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hub = document.querySelector<Element & { uri: string }>('stoplight-hub');
        const baseUrl = hub.getAttribute('baseUrl');
        hub.uri = event.url.replace(baseUrl, '');

        console.log('NavigationEnd', { browserUrl: event.url, stoplightUri: hub.uri });
      }
    });
  }
}
