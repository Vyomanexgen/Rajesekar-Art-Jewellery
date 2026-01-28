import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./MainDashboardComponents.css";

const PaymentMethods = () => {
  const paymentStats = [
    { method: "UPI", count: 120_000 },
    { method: "Cards", count: 85_000 },
    { method: "COD", count: 40_000 },
    { method: "Wallets", count: 32_000 },
    { method: "NetBanking", count: 28_000 },
  ];

  return (
    <div className="payment-chart-box">
      <h3 className="payment-chart-title">Payment Methods</h3>

      <ResponsiveContainer width="100%" height={370}>
        <BarChart
          data={paymentStats}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="method" />
          <YAxis tickFormatter={(v) => v.toLocaleString()} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar dataKey="count" fill="#2A66FF" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentMethods;
