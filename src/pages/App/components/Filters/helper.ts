export type OptionItem = {
  value: number
  label: string
}

export const daysOptions: OptionItem[] = new Array(31).fill(null).map((_, index) => {
  const days = index + 1

  return {
    value: days,
    label: `Day ${days}`
  }
})
