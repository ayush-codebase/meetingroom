import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) return ''
    if (value instanceof Date) {
      return value.toTimeString().slice(0, 5)
    }
    return value
  }
}
