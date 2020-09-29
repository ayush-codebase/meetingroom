import { AbstractControl, ValidatorFn } from '@angular/forms'

export class CustomValidators {
  static DurationValidator(refCtrl: AbstractControl): ValidatorFn {
    return (control: AbstractControl) => {
      if (!refCtrl) throw new Error('Control not bound for reference')
      if (refCtrl.value) {
        let start = new Date(refCtrl.value)
        let end = new Date(control.value)
        if (end.getHours() * 60 + end.getMinutes() - (start.getHours() * 60 + start.getMinutes()) < 30)
          return {
            duration: true,
            msg: 'Minimum duration should be 30 minutes',
          }
        return null
      }
    }
  }
  static In(arr: any[], property: string) {
    return (control: AbstractControl) => {
      let index
      if (!property) index = arr.findIndex((x: string) => x.toLowerCase() == control.value.toLowerCase())
      else index = arr.findIndex((x) => x[property].toLowerCase() == control.value.toLowerCase())
      if (index == -1)
        return {
          notExist: true,
        }
      return null
    }
  }
}
