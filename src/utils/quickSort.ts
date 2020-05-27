export const quickSort = (array: Array<number>): Array<number> => {
  if(array.length <= 1) return array

  const pivot = array[0]

  const arrayLower = array.filter((value: number, index: number): boolean => {
    if(index > 0) return value <= pivot

    return false
  })
  const arrayUpper = array.filter((value: number, index: number): boolean => {
    if(index > 0) return value > pivot

    return false
  })

  return quickSort(arrayUpper).concat([pivot]).concat(quickSort(arrayLower))
}
