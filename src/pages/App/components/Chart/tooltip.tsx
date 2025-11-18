import { useMemo } from "react"
import dayjs from "dayjs"
import { Star } from "lucide-react"

import { getVariationLabel } from "./helper"
import style from "./style.module.css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTooltip = ({ payload, label, active }: any) => {
  const sortedPayload = useMemo(() => {
    if (!active || !payload) {
      return []
    }

    return [...payload].sort((a, b) => b.value - a.value)
  }, [payload, active])

  if (active && payload && payload.length) {
    return (
      <div className={style.tooltip}>
        <p className={style.tooltipLabel}>{label ? dayjs(label).format("DD/MM/YYYY") : ""}</p>
        <div className={style.tooltipOptions}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {sortedPayload.map((item: any, idx: number) => (
            <div key={item.dataKey} className={style.tooltipOption}>
              <div className={style.tooltipOptionLabel} style={{ color: item.color }}>
                {getVariationLabel(Number(item.dataKey))}
                {idx === 0 && <Star className={style.tooltipOptionIcon} />}
              </div>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
