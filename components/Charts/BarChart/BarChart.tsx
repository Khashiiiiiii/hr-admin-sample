"use client";

import styles from "./BarChart.module.scss";
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({
  data,
  color,
}: {
  data: { title: string; value: number }[];
  color: string;
}) => {
  console.log(data, "data");
  return (
    <ResponsiveContainer height={400} className={styles.wrapper}>
      <Chart data={data} className={styles.chartWrapper}>
        <CartesianGrid
          stroke="#ccc"
          horizontal={true}
          vertical={false}
          widths={"100%"}
        />
        <XAxis
          dataKey="title"
          tick={{ fill: "#666", fontSize: 14 }}
          tickLine={false}
          tickFormatter={(value) =>
            data.length > 5 ? parseInt(value).toLocaleString("fa-IR") : value
          }
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#686E78", fontSize: 16, fontWeight: 400 }}
          tickFormatter={(num) => num.toLocaleString("fa-IR")}
          tickMargin={22}
          dataKey="value"
        />

        <Bar
          dataKey="value"
          fill={color}
          radius={[10, 10, 0, 0]}
          label={{
            position: "center",
            fill: "#686E78",
            fontSize: 16,
            fontWeight: 400,
            formatter: (num: number) => num.toLocaleString("fa-IR"),
          }}
        />
      </Chart>
    </ResponsiveContainer>
  );
};

export default BarChart;
