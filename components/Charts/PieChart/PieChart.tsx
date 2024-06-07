"use client";

import styles from "./PieChart.module.scss";
import {
  PieChart as Chart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  LegendProps,
} from "recharts";

interface CustomLegendProps {
  payload?: LegendProps["payload"];
}

const PieChart = ({
  data,
  colors,
}: {
  data: { title: string; value: number }[];
  colors: string[];
}) => {
  const CustomLegend: React.FC<CustomLegendProps> = ({ payload = [] }) => {
    const sum = payload.reduce((prev, current) => {
      return (prev += current.payload?.value);
    }, 0);

    return (
      <div
        className="customized-legend"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className={styles.legendWrapper}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className={styles.svg}
            >
              <rect
                width="16"
                height="16"
                rx="2"
                ry="2"
                style={{ fill: entry.color }}
                className={styles.rect}
              />
            </svg>

            <div className={styles.titleWrapper}>
              {/* @ts-ignore */}
              <span>{entry.payload.title}</span>
              <span className={styles.value}>
                {/* @ts-ignore */}
                {`${parseInt(((entry.payload.value * 100) / sum).toFixed(2)).toLocaleString("fa-IR")}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={390} className={styles.wrapper}>
      <Chart width={306} height={306} className={styles.chart}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          // label={({ cx, cy, midAngle, innerRadius, outerRadius, name }) => {
          //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
          //   const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
          //   const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

          //   return (
          //     <text
          //       x={x}
          //       y={y}
          //       fill={`black`}
          //       style={{ opacity: "40%" }}
          //       textAnchor={x > cx ? "start" : "end"}
          //       dominantBaseline="central"
          //     >
          //       {(name + 1).toLocaleString("fa-IR")}
          //     </text>
          //   );
          // }}
          outerRadius={150}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          content={CustomLegend}
        />
      </Chart>
    </ResponsiveContainer>
  );
};

export default PieChart;
