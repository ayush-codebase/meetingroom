import { Injectable } from '@angular/core'
import { empty, Observable, of, Subscriber, throwError } from 'rxjs'
import { Meeting } from '../models/meeting.model'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  save(item: Meeting): Observable<any> {
    item.id = Math.floor(Math.random() * 10000) + 1
    let _: any = { ...item }

    let store: Meeting[] = JSON.parse(localStorage.getItem('store')) || []
    store.push(_)

    try {
      localStorage.setItem('store', JSON.stringify(store))
      return of(true)
    } catch (e) {
      throwError(e)
    }
  }

  retrieve(id: number): Observable<Meeting> {
    let store = JSON.parse(localStorage.getItem('store')) || []
    let _ = store.find((meeting) => meeting.id === id)
    let meeting: Meeting = { ..._ }
    meeting.from = new Date(_.from)
    meeting.to = new Date(_.to)
    meeting.date = new Date(_.date)
    if (meeting) return of(meeting)
    throwError(new Error('Cannot find the given meeting'))
  }

  allMeetings(): Observable<Meeting[]> {
    // let store: any[] = JSON.parse(localStorage.getItem('store')) || []
    // store.forEach((item) => {
    //   item.to = new Date(item.to)
    //   item.date = new Date(item.date)
    //   item.from = new Date(item.from)
    // })
    // return of(store)
    return new Observable((subscriber) => {
      setInterval(() => {
        let store: any[] = JSON.parse(localStorage.getItem('store')) || []
        store.forEach((item) => {
          item.to = new Date(item.to)
          item.date = new Date(item.date)
          item.from = new Date(item.from)
        })
        subscriber.next(store)
      }, 800)
    })
  }

  delete(id: number) {
    return new Observable((subscriber) => {
      let store: any[] = JSON.parse(localStorage.getItem('store')) || []
      let index = store.findIndex((meeting) => meeting.id === id)
      if (index == -1) throwError(new Error('Cannot find the given meeting'))
      store.splice(index, 1)
      localStorage.setItem('store', JSON.stringify(store))
      subscriber.next()
    })
  }

  getAvailability(room, startTime, endTime) {
    return new Observable((subscriber) => {
      let store: any[] = JSON.parse(localStorage.getItem('store')) || []
      store.forEach((item) => {
        item.to = new Date(item.to)
        item.date = new Date(item.date)
        item.from = new Date(item.from)
      })
      let meeting = store.find(
        (x) =>
          x.room == room && ((+startTime >= +x.from && startTime <= +x.to) || (+endTime >= +x.from && endTime <= +x.to))
      )
      subscriber.next(meeting)
    })
  }
}
