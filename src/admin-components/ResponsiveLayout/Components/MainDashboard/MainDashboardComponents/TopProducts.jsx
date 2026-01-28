import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./MainDashboardComponents.css";

const TopProducts = ({ products = [] }) => {
  // Transform products data for Recharts
  const chartData = products.map((p) => ({
    name: p.title,
    unitsSold: p.unitsSold,
    price: p.price,
  }));

  // Custom tooltip to show product details
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="topprod-tooltip">
          <p className="topprod-tooltip-name">{payload[0].payload.name}</p>
          <p className="topprod-tooltip-units">
            Units Sold: <strong>{payload[0].value}</strong>
          </p>
          <p className="topprod-tooltip-price">
            Revenue: <strong>{payload[0].payload.price}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  // Bar colors gradient
  const barColors = ["#3b82f6", "#60a5fa", "#2563eb", "#1d4ed8", "#1e40af"];

  return (
    <div className="topprod-wrap" role="region" aria-label="Top Products">
      <div className="topprod-header">
        <h3 className="topprod-title">Top Products</h3>
      </div>

      <ResponsiveContainer width="100%" height={370}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ fontSize: 12, fill: "#374151" }}
          />
          <YAxis
            label={{
              value: "Units Sold",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 14, fill: "#6b7280" },
            }}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
          <Bar dataKey="unitsSold" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProducts;
