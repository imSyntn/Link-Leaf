import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartDataType } from "./page";

const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

const LineChartComp = ({monthNames, chartData}: {monthNames: string[], chartData: chartDataType[]}) => {
  return (
    <Card>
      <CardHeader className="p-2 sm:p-6">
        <CardTitle>View count</CardTitle>
        <CardDescription>
          {monthNames[chartData[0].month - 1]} to{" "}
          {monthNames[chartData.length - 1]}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] min-w-[335px] w-[80vw] sm:w-[70vw] max-w-[750px] "
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => monthNames[value - 1]}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="linear"
              stroke={chartConfig.count.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartComp;
