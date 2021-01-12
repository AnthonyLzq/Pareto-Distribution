import { Person } from '../classes/person'

export const quickSort = (array: Array<Person>): Array<Person> => { // Person[]
  if(array.length <= 1) return array

  const pivot = array[0]

  const arrayLower = array.filter((person: Person, index: number): boolean => {
    if(index > 0) return person.money <= pivot.money

    return false
  })

  const arrayUpper = array.filter((person: Person, index: number): boolean => {
    if(index > 0) return person.money > pivot.money

    return false
  })

  return quickSort(arrayUpper).concat([pivot]).concat(quickSort(arrayLower))
}
