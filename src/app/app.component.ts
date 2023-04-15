import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-app';

  selectedNames: string[] = []; //pass data from child component to parent App component

  onSelectedNamesChange(seats: string[]) {
    //pass on click data from child component to parent App component
    this.selectedNames = seats;
  }
}
