import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    nav {
      display: flex;
      gap: 20px;
      padding: 14px 16px;
      background-color: #333;
    }
    nav a {
      color: #f2f2f2;
      text-decoration: none;
    }
    nav a.active {
      font-weight: 600;
    }
    main {
      flex: 1 0 0;
      overflow: hidden;
    }
  `,
})
export class AppComponent {}
