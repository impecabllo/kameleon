import { useCallback, useMemo } from "react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

import backendData from "@/config/data.json"

import { formatXAxisTick, formatYAxisTick } from "./helper"
import { CustomTooltip } from "./tooltip"

import type { ChartDataItem } from "../../types"
import type { FC } from "react"

type Props = {
  enabledVariations: number[]
  selectedDay: number | null
}

export const Chart: FC<Props> = ({ enabledVariations, selectedDay }) => {
  const getConversionRate = useCallback((conversions: number, visits: number) => {
    return Number(((conversions / visits) * 100).toFixed(2))
  }, [])

  const formattedData: ChartDataItem[] = useMemo(() => {
    return backendData.data.reduce((acc: ChartDataItem[], el) => {
      if (selectedDay !== null && selectedDay !== Number(el.date.slice(-2))) {
        return acc
      }

      const newEl = {
        date: el.date,
        ...(el.visits["0"] &&
          el.conversions["0"] &&
          enabledVariations.includes(0) && {
            "0": getConversionRate(el.conversions["0"], el.visits["0"])
          }),
        ...(el.visits["10001"] &&
          el.conversions["10001"] &&
          enabledVariations.includes(10001) && {
            "10001": getConversionRate(el.conversions["10001"], el.visits["10001"])
          }),
        ...(el.visits["10002"] &&
          el.conversions["10002"] &&
          enabledVariations.includes(10002) && {
            "10002": getConversionRate(el.conversions["10002"], el.visits["10002"])
          }),
        ...(el.visits["10003"] &&
          el.conversions["10003"] &&
          enabledVariations.includes(10003) && {
            "10003": getConversionRate(el.conversions["10003"], el.visits["10003"])
          })
      }

      return [...acc, newEl]
    }, [])
  }, [enabledVariations, selectedDay])

  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "1300px",
        height: "100%",
        maxHeight: "330px",
        aspectRatio: 1.618
      }}
      responsive
      data={formattedData}
      margin={{
        top: 15,
        right: 0,
        left: 0,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
      <CartesianGrid
        stroke="#eee"
        strokeDasharray="0"
        horizontalCoordinatesGenerator={() => [15]}
        verticalCoordinatesGenerator={() => []}
      />
      <CartesianGrid
        stroke="#eee"
        strokeDasharray="0"
        horizontal={false}
        verticalCoordinatesGenerator={(props) => [props.width]}
      />
      <XAxis
        dataKey="date"
        fontSize={13}
        axisLine={{ stroke: "#eee", strokeDasharray: "0" }}
        tickFormatter={formatXAxisTick}
      />
      <YAxis
        width="auto"
        tickFormatter={formatYAxisTick}
        fontSize={13}
        axisLine={{ stroke: "#eee", strokeDasharray: "0" }}
      />
      <Tooltip content={CustomTooltip} defaultIndex={2} active />
      {enabledVariations.includes(0) && (
        <Line type="monotone" dataKey="0" stroke="#8884d8" strokeWidth={3} dot={false} />
      )}
      {enabledVariations.includes(10001) && (
        <Line type="monotone" dataKey="10001" stroke="#82ca9d" strokeWidth={3} dot={false} />
      )}
      {enabledVariations.includes(10002) && (
        <Line type="monotone" dataKey="10002" stroke="#000" strokeWidth={3} dot={false} />
      )}
      {enabledVariations.includes(10003) && (
        <Line type="monotone" dataKey="10003" stroke="orange" strokeWidth={3} dot={false} />
      )}
    </LineChart>
  )
}
