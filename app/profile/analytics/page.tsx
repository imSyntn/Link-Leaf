"use client";

import React, { Suspense, useEffect, useState } from "react";
import LineChartComp from "./LineChart";
import RadialChartComp from "./RadialChartComp";
import axios from "axios";
import { useUserContext } from "@/app/UserContext";
import { useRouter } from "next/navigation";
import Loader, { LoaderWrapper } from "@/components/Loader";

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

// const chartData: chartDataType[] = [
//   {
//     // year: 2024,
//     month: 1,
//     count: 46,
//   },
//   {
//     // year: 2024,
//     month: 2,
//     count: 73,
//   },
//   {
//     // year: 2024,
//     month: 3,
//     count: 108,
//   },
//   {
//     // year: 2024,
//     month: 4,
//     count: 142,
//   },
//   {
//     // year: 2024,
//     month: 5,
//     count: 182,
//   },
//   {
//     // year: 2024,
//     month: 6,
//     count: 208,
//   },
//   {
//     // year: 2024,
//     month: 7,
//     count: 248,
//   },
//   {
//     // year: 2024,
//     month: 8,
//     count: 422,
//   },
//   {
//     // year: 2024,
//     month: 9,
//     count: 320,
//   },
//   {
//     // year: 2024,
//     month: 10,
//     count: 357,
//   },
//   {
//     // year: 2024,
//     month: 11,
//     count: 384,
//   },
//   {
//     // year: 2024,
//     month: 12,
//     count: 282,
//   },
// ].sort((a, b) => a.month - b.month);

export default function PageWrapper () {
  return <Suspense fallback={<LoaderWrapper />}><Page /></Suspense>
}

function Page() {
  const { user } = useUserContext();

  const [chartData, setCharData] = useState<chartDataType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // const description: string = chartData
  //   ? `${monthNames[chartData[0].month - 1]} to ${
  //       monthNames[chartData.length - 1]
  //     }`
  //   : "";

  const TotalVisitors: number = chartData
    ? chartData.reduce((sum, item) => (sum += item.count), 0)
    : 0;
  const AverageVisitors: number = chartData
    ? chartData.reduce((sum, item) => (sum += item.count), 0) / chartData.length
    : 0;
  const MonthlyVisitorsObj: chartDataType | null = chartData
    ? chartData[chartData.length - 1]
    : {};

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!user.isLoggedin) {
      timer = setTimeout(() => {
        router.push("/signup");
      }, 1500);
    } else {
      setLoading(true);
      axios
        .get(`/api/share/visitors?id=${user.id}`)
        .then((e) => {
          const data = e.data.data.sort((a: chartDataType, b: chartDataType) => a.month - b.month);
          setCharData(data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
    return () => {
      clearTimeout(timer);
    };
  }, [user]);

  return (
    <div className="min-h-[80vh] flex gap-5 justify-center items-center flex-wrap">
      {user.isLoggedin ? (
        !loading ? (
          chartData && Array.isArray(chartData) && chartData.length > 0 ? (
            <>
              <RadialChartComp
                description={`${monthNames[chartData[0].month - 1]} to ${
                  monthNames[MonthlyVisitorsObj.month - 1]
                }`}
                visitors={Math.floor(TotalVisitors)}
                text="Total Visitors"
                footerHead={"Total views updated recently"}
                footerTail={"Cumulative views."}
              />
              <RadialChartComp
                description={monthNames[MonthlyVisitorsObj.month - 1]}
                visitors={Math.floor(MonthlyVisitorsObj.count)}
                text="Monthly Visitors"
                footerHead={"Monthly views updated recently"}
                footerTail={"Cumulative views."}
              />
              <RadialChartComp
                description={`${monthNames[chartData[0].month - 1]} to ${
                  monthNames[MonthlyVisitorsObj.month - 1]
                }`}
                visitors={Math.floor(AverageVisitors)}
                text="Average Visitors"
                footerHead={"Average views updated recently"}
                footerTail={"Average views."}
              />
              <LineChartComp monthNames={monthNames} chartData={chartData} />
            </>
          ) : (
            <p className="text-2xl">No data available ...</p>
          )
        ) : (
          <div className="">
            <Loader />
          </div>
        )
      ) : (
        <p className="text-2xl">You are being redirected ...</p>
      )}
    </div>
  );
}
