"use client";

import React from "react";
import LineChartComp from "./LineChart";
import RadialChartComp from "./RadialChartComp";

const monthNames: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface chartDataType {
  [key: string]: number;
}

const chartData: chartDataType[] = [
  {
    // year: 2024,
    month: 1,
    count: 46,
  },
  {
    // year: 2024,
    month: 2,
    count: 73,
  },
  {
    // year: 2024,
    month: 3,
    count: 108,
  },
  {
    // year: 2024,
    month: 4,
    count: 142,
  },
  {
    // year: 2024,
    month: 5,
    count: 182,
  },
  {
    // year: 2024,
    month: 6,
    count: 208,
  },
  {
    // year: 2024,
    month: 7,
    count: 248,
  },
  {
    // year: 2024,
    month: 8,
    count: 422,
  },
  {
    // year: 2024,
    month: 9,
    count: 320,
  },
  {
    // year: 2024,
    month: 10,
    count: 357,
  },
  {
    // year: 2024,
    month: 11,
    count: 384,
  },
  {
    // year: 2024,
    month: 12,
    count: 282,
  },
].sort((a, b) => a.month - b.month);

export default function Page() {
  const description: string = `${monthNames[chartData[0].month - 1]} to ${
    monthNames[chartData.length - 1]
  }`;

  const TotalVisitors: number = chartData.reduce(
    (sum, item) => (sum += item.count),
    0
  );
  const AverageVisitors: number =
    chartData.reduce((sum, item) => (sum += item.count), 0) / chartData.length;
  const MonthlyVisitorsObj: chartDataType = chartData[chartData.length - 1];

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center  pt-[80px]">
      <div className=" flex justify-between items-center gap-5 flex-wrap mb-4">
        <RadialChartComp
          thisMonth={false}
          description={description}
          visitors={Math.floor(TotalVisitors)}
          text="Total Visitors"
        />
        <RadialChartComp
          thisMonth={false}
          description={monthNames[MonthlyVisitorsObj.month - 1]}
          visitors={Math.floor(MonthlyVisitorsObj.count)}
          text="Monthly Visitors"
        />
        <RadialChartComp
          thisMonth={false}
          description={`${monthNames[chartData[0].month - 1]} to ${monthNames[MonthlyVisitorsObj.month - 1]}`}
          visitors={Math.floor(AverageVisitors)}
          text="Avarage Visitors"
        />
      </div>
      <LineChartComp monthNames={monthNames} chartData={chartData} />
    </div>
  );
}
