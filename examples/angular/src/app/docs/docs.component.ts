import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

const projectSrn = 'gh/stoplightio/studio-demo';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html'
})
export class DocsComponent implements AfterViewInit {
  constructor(private ngZone: NgZone, private router: Router) {
    // When the angular router emits a route change event, update the SRNs on the elements so that
    // the re-render with the correct content
    router.events.subscribe(val => {
      // @ts-ignore
      if (val instanceof NavigationEnd && typeof SL !== 'undefined') {
        // @ts-ignore
        SL.elements.toc.srn = val.url.replace('/docs', projectSrn);

        // @ts-ignore
        SL.elements.page.srn = val.url.replace('/docs', projectSrn);
      }
    });
  }

  ngAfterViewInit() {
    // @ts-ignore
    if (typeof SL !== 'undefined') {
      this.initStoplight();
    } else {
      window.addEventListener('SL.ready', () => this.initStoplight(), { once: true });
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
                .run(() => this.router.navigate([node.url.replace(projectSrn, '/docs')]))
                .then();
            },
          },
          children,
        );
      },
    };

    // Render the TableOfContents and Page elements

    // @ts-ignore
    SL.elements.toc.render('stoplight-toc', this.router.url.replace('/docs', projectSrn));

    // @ts-ignore
    SL.elements.page.render('stoplight-page', this.router.url.replace('/docs', projectSrn));
  }
}
