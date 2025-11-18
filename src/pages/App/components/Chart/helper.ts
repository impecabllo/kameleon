export const formatYAxisTick = (value: number): string => {
  return `${value}%`
}

export const formatXAxisTick = (value: string): string => {
  return value.slice(5).replace("-", "/")
}

export const getVariationLabel = (id: number): string => {
  switch (id) {
    case 0:
      return "Original"
    case 10001:
      return "Variation A"
    case 10002:
      return "Variation B"
    case 10003:
      return "Variation C"
    default:
      return ""
  }
}
