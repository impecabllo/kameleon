import { useState } from "react"

import { Chart } from "./components/Chart"
import { Filters } from "./components/Filters"
import { defaultVariations } from "./helper"
import style from "./style.module.css"

import type { FC } from "react"

export const App: FC = () => {
  const [enabledVariations, setEnabledVariations] = useState<number[]>(defaultVariations)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Filters
          enabledVariations={enabledVariations}
          setEnabledVariations={setEnabledVariations}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <Chart selectedDay={selectedDay} enabledVariations={enabledVariations} />
      </div>
    </div>
  )
}
