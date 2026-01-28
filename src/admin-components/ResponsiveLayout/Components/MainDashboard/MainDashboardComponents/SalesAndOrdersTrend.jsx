import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./MainDashboardComponents.css";

const SalesAndOrdersTrend = () => {
  const weeklyChartData = [
    { name: "Jan 1", orders: 45_000, sales: 0 },
    { name: "Jan 2", orders: 52_000, sales: 0 },
    { name: "Jan 3", orders: 48_000, sales: 0 },
    { name: "Jan 4", orders: 61_000, sales: 0 },
    { name: "Jan 5", orders: 55_000, sales: 0 },
    { name: "Jan 6", orders: 68_000, sales: 0 },
    { name: "Jan 7", orders: 73_000, sales: 0 },
  ];

  const monthlyChartData = [
    { name: "Jan", orders: 450_000, sales: 0 },
    { name: "Feb", orders: 480_000, sales: 0 },
    { name: "Mar", orders: 520_000, sales: 0 },
    { name: "Apr", orders: 610_000, sales: 0 },
    { name: "May", orders: 680_000, sales: 0 },
    { name: "Jun", orders: 720_000, sales: 0 },
    { name: "Jul", orders: 760_000, sales: 0 },
    { name: "Aug", orders: 810_000, sales: 0 },
    { name: "Sep", orders: 780_000, sales: 0 },
    { name: "Oct", orders: 830_000, sales: 0 },
    { name: "Nov", orders: 870_000, sales: 0 },
    { name: "Dec", orders: 940_000, sales: 0 },
  ];

  const yearlyChartData = [
    { name: "2018", orders: 3_200_000, sales: 0 },
    { name: "2019", orders: 3_750_000, sales: 0 },
    { name: "2020", orders: 4_100_000, sales: 0 },
    { name: "2021", orders: 4_650_000, sales: 0 },
    { name: "2022", orders: 5_300_000, sales: 0 },
    { name: "2023", orders: 6_100_000, sales: 0 },
    { name: "2024", orders: 7_250_000, sales: 0 },
  ];

  const [selectedRange, setSelectedRange] = useState("week");
  const [chartData, setChartData] = useState(weeklyChartData);
  useEffect(() => {
    if (selectedRange === "week") setChartData(weeklyChartData);
    else if (selectedRange === "month") setChartData(monthlyChartData);
    else setChartData(yearlyChartData);
  }, [selectedRange]);

  return (
    <div className="trend-container">
      <div className="trend-header">
        <h3>Sales & Orders Trend</h3>

        <div className="trend-toggle">
          {/* <button>Day</button>
          <button>Week</button> */}
          <button
            className={selectedRange === "week" ? "active" : ""}
            onClick={() => setSelectedRange("week")}
          >
            week
          </button>
          <button
            className={selectedRange === "month" ? "active" : ""}
            onClick={() => setSelectedRange("month")}
          >
            month
          </button>
          <button
            className={selectedRange === "year" ? "active" : ""}
            onClick={() => setSelectedRange("year")}
          >
            year
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => v.toLocaleString()} />
          <Tooltip formatter={(val) => val.toLocaleString()} />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#008CFF"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#0055FF"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAndOrdersTrend;
