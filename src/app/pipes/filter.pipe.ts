import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchtext: string, property: string): unknown {
    if (!value) return
    let searchResults
    if (!property) searchResults = value.filter((x: string) => x.toLowerCase().includes(searchtext.toLowerCase()))
    else searchResults = value.filter((x) => x[property].toLowerCase().includes(searchtext.toLowerCase()))
    if (searchResults) return searchResults
    return null
  }
}
