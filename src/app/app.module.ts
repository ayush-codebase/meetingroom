import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NewBookingComponent } from './new-booking/new-booking.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TimePipe } from './pipes/time.pipe'
import { AllBookingsComponent } from './all-bookings/all-bookings.component'
import { MeetingComponent } from './meeting/meeting.component'
import { FilterPipe } from './pipes/filter.pipe'

@NgModule({
  declarations: [AppComponent, NewBookingComponent, TimePipe, AllBookingsComponent, MeetingComponent, FilterPipe],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
