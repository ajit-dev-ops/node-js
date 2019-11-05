import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h2><a href="/user?id=1">click to go to user form page</a  ></h2>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'angular-form-builder';
}
