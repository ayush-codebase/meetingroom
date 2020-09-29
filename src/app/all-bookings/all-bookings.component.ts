import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Meeting } from '../models/meeting.model'
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss'],
})
export class AllBookingsComponent implements OnInit, OnChanges {
  meetings: Observable<Meeting[]>
  @Input() filterRoom: string

  constructor(private _data: DataService) {}

  ngOnChanges() {}

  ngOnInit(): void {
    this.meetings = this._data.allMeetings()
  }
}
