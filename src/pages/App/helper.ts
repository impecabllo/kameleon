import backendData from "@/config/data.json"

export const defaultVariations: number[] = backendData.variations.map((variation) => variation.id)
