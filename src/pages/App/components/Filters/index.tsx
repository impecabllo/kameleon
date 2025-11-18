import { useMemo } from "react"
import Select from "react-select"

import backendData from "@/config/data.json"

import { getVariationLabel } from "../Chart/helper"
import { daysOptions } from "./helper"
import style from "./style.module.css"

import type { OptionItem } from "./helper"
import type { FC } from "react"
import type { MultiValue } from "react-select"

type Props = {
  enabledVariations: number[]
  setEnabledVariations: (variations: number[]) => void
  selectedDay: number | null
  setSelectedDay: (day: number | null) => void
}

export const Filters: FC<Props> = ({ enabledVariations, setEnabledVariations, selectedDay, setSelectedDay }) => {
  const defaultVariations = useMemo(() => {
    return backendData.variations.map((variation) => ({ value: variation.id, label: getVariationLabel(variation.id) }))
  }, [])

  const variations = useMemo(() => {
    return enabledVariations.map((variation) => ({ value: variation, label: getVariationLabel(variation) }))
  }, [enabledVariations])

  const handleChangeVariations = (selectedOptions: MultiValue<OptionItem>) => {
    if (selectedOptions === null || !selectedOptions?.length) {
      return
    }

    const variations = selectedOptions ? selectedOptions.map((option: OptionItem) => option.value) : []
    setEnabledVariations(variations)
  }

  return (
    <div className={style.filters}>
      <Select
        value={variations}
        className={style.variations}
        isMulti
        name="variations"
        options={defaultVariations}
        isClearable={false}
        onChange={handleChangeVariations}
      />

      <Select
        value={selectedDay ? { value: selectedDay, label: `Day ${selectedDay}` } : null}
        name="day"
        className={style.day}
        placeholder="Select day..."
        options={daysOptions}
        isClearable={true}
        onChange={(option) => setSelectedDay(option ? option.value : null)}
      />
    </div>
  )
}
