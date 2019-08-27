import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
})
export class DocsComponent implements AfterViewInit {
  constructor(private ngZone: NgZone, private router: Router) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        // @ts-ignore
        if (SL) {
          // @ts-ignore
          SL.elements.page.srn = val.url.replace('/docs', 'gh/stoplightio/spectral');
          // @ts-ignore
          SL.elements.toc.srn = val.url.replace('/docs', 'gh/stoplightio/spectral');
        }
      }
    });
  }

  ngAfterViewInit() {
    if (SL) {
      this.initStoplight();
    } else {
      window.addEventListener('SL.ready', () => this.initStoplight());
    }
  }

  initStoplight() {
    // @ts-ignore
    SL.config.components = {
      // Add a custom link component to be used in the TOC and Page elements
      link: ({ node, children }) => {
        const isAbsolute = /^http/.test(node.url);

        // @ts-ignore
        return SL.createElement(
          'a',
          {
            className: node.className,
            title: node.title,
            href: isAbsolute ? node.url : `/docs/${node.url}`,
            onClick: e => {
              if (isAbsolute) {
                return;
              }

              e.preventDefault();

              // Whenever the link is clicked, handle navigating using angular router
              this.ngZone
                .run(() => this.router.navigate([node.url.replace('gh/stoplightio/spectral', '/docs')]))
                .then();
            },
          },
          children,
        );
      },
    };

    // Render the TableOfContents and Page elements
    // @ts-ignore
    SL.elements.toc.render('stoplight-toc', this.router.url.replace('/docs', 'gh/stoplightio/spectral'));
    // @ts-ignore
    SL.elements.page.render('stoplight-page', this.router.url.replace('/docs', 'gh/stoplightio/spectral'));
  }
}
