import { Component, Input, OnInit } from '@angular/core'
import { Meeting } from '../models/meeting.model'
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  @Input() meeting: Meeting

  constructor(private _data: DataService) {}

  ngOnInit(): void {}

  cancelMeeting(id: number) {
    this._data.delete(id).subscribe()
  }
}
