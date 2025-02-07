"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useLocale } from "next-intl";
const chartData = [
  { name: "Ahmed", appointments: 350 },
  { name: "John", appointments: 305 },
  { name: "Jane", appointments: 237 },
  { name: "Samir", appointments: 220 },
  { name: "Kamel", appointments: 209 },
];

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TopDoctorChart() {
  const locale = useLocale();
  return (
    <ChartContainer className="flex-1 aspect-auto" config={chartConfig}>
      <BarChart
        className="rtl"
        accessibilityLayer
        data={chartData}
        layout="vertical"
      >
        <XAxis
          reversed={locale === "ar"}
          type="number"
          dataKey="appointments"
          hide
        />
        <YAxis
          orientation={locale === "ar" ? "right" : "left"}
          //   mirror={locale === "ar"}
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={locale === "en" ? 10 : 50}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="appointments"
          fill="var(--color-appointments)"
          radius={5}
        />
      </BarChart>
    </ChartContainer>
  );
}
