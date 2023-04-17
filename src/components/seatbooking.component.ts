import { Component } from '@angular/core';

@Component({
  selector: 'seatbooking',
  templateUrl: './seatbooking.component.html',
  styleUrls: ['./seatbooking.component.css'],
})
export class SeatbookingComponent {
  title = 'seatbooking';

  selectedNames: string[] = []; //pass data from child component to parent App component

  onSelectedNamesChange(seats: string[]) {
    //pass on click data from child component to parent App component
    this.selectedNames = seats;
  }
}
