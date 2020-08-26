import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public title = 'Angular demo';
}
