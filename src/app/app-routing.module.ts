import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatbookingComponent } from '../components/seatbooking.component';
import { TriplebarchartComponent } from '../components/triplebarchart.component';

const routes: Routes = [
  { path: '', redirectTo: '/booking', pathMatch: 'full' }, // Default route
  { path: 'booking', component: SeatbookingComponent }, // Route for BookingComponent
  { path: 'triplebarchart', component: TriplebarchartComponent }, // Route for ChartComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
