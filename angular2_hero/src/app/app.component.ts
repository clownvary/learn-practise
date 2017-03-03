/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';
/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Tour of Heroes';
}
