import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../validators/duration.validator'
import { DataService } from '../services/data.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { Meeting } from '../models/meeting.model'

const PERMITTED_TIME_DIFFERENCE = 5

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
})
export class NewBookingComponent implements OnInit {
  booking: FormGroup
  allRooms: any[]
  meetingFromTimings: Date[]
  meetingToTimings: Date[]
  roomListVisible = false
  fromTimeVisible = false
  toTimeVisible = false
  prebookedMeeting: Meeting = null

  @Output() filterMeetings = new EventEmitter<any>()

  constructor(private _data: DataService) {}

  ngOnInit(): void {
    let today = new Date()
    document.addEventListener('click', (e) => {
      if (e.target['id'] !== 'room') this.roomListVisible = false
      if (e.target['id'] !== 'startTime') this.fromTimeVisible = false
      if (e.target['id'] !== 'endTime') this.toTimeVisible = false
    })
    this.booking = new FormGroup({
      username: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      date: new FormControl(today, [Validators.required]),
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      agenda: new FormControl('', [Validators.required]),
    })
    this.endTime.setValidators(CustomValidators.DurationValidator(this.startTime))
    this.startTime.valueChanges.subscribe((new_start_time: Date) => {
      if (+new Date(new_start_time) > +new Date(this.endTime.value) || this.endTime.value === '') {
        this.endTime.setValue(new Date(+new Date(new_start_time) + 1800 * 1000))
        this.checkRoomAvailability()
      }
    })
    this.booking.get('date').valueChanges.subscribe((new_date: Date) => {
      this.createMeetingFromTimings(new Date(new_date))
      this.createMeetingToTimings(new Date(new_date))
    })

    this.allRooms = [
      { name: 'Marigold', value: 'marigold' },
      { name: 'Daffodil', value: 'daffodil' },
      { name: 'Daisy', value: 'daisy' },
    ]
    this.room.setValidators(CustomValidators.In(this.allRooms, 'value'))
    this.createMeetingFromTimings()
    this.createMeetingToTimings(this.meetingFromTimings[0])
  }

  createMeetingFromTimings(from: Date = new Date()) {
    let fromDate = new Date(from)
    if (fromDate.getHours() < 9) {
      fromDate.setHours(9)
      fromDate.setMinutes(0)
    }
    this.meetingFromTimings = []

    fromDate.setMinutes(
      fromDate.getMinutes() + (PERMITTED_TIME_DIFFERENCE - (fromDate.getMinutes() % PERMITTED_TIME_DIFFERENCE))
    )
    while (!(fromDate.getHours() == 20 && fromDate.getMinutes() == 35)) {
      this.meetingFromTimings.push(fromDate)
      fromDate = new Date(fromDate)
      fromDate.setMinutes(fromDate.getMinutes() + PERMITTED_TIME_DIFFERENCE)
    }
  }

  createMeetingToTimings(from: Date = new Date()) {
    let toDate = new Date(from)
    toDate.setMinutes(toDate.getMinutes() + 30) // start the timings 30 minutes from minimum meeting from time
    this.meetingToTimings = []

    toDate.setMinutes(
      toDate.getMinutes() + (PERMITTED_TIME_DIFFERENCE - (toDate.getMinutes() % PERMITTED_TIME_DIFFERENCE))
    )

    while (toDate.getHours() < 21 || (toDate.getHours() == 21 && toDate.getMinutes() == 0)) {
      this.meetingToTimings.push(toDate)
      toDate = new Date(toDate)
      toDate.setMinutes(toDate.getMinutes() + PERMITTED_TIME_DIFFERENCE)
    }
  }

  selectRoom(val) {
    this.room.setValue(val, { emitEvent: false })
    this.roomListVisible = false
    this.filterMeetings.emit(val)
  }

  selectStartTime(val) {
    this.startTime.setValue(val)
    this.fromTimeVisible = false
    if (this.endTime.value) this.checkRoomAvailability()
  }

  selectEndTime(val) {
    this.endTime.setValue(val, { emitEvent: false })
    this.toTimeVisible = false
    if (this.startTime.value) this.checkRoomAvailability()
  }

  checkRoomAvailability() {
    this._data
      .getAvailability(this.room.value, this.startTime.value, this.endTime.value)
      .subscribe((meeting: Meeting) => {
        this.prebookedMeeting = meeting
      })
  }

  setFilter(val) {
    this.filterMeetings.emit(val)
  }

  submit() {
    this._data.save(this.booking.value)
  }

  get startTime() {
    return this.booking.get('from')
  }

  get endTime() {
    return this.booking.get('to')
  }

  get day() {
    return this.booking.get('date')
  }

  get room() {
    return this.booking.get('room')
  }

  get agenda() {
    return this.booking.get('agenda')
  }

  get username() {
    return this.booking.get('username')
  }
}
