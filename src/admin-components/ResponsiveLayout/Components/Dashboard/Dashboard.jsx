import MetricCard from "./DashboardComponents/MetricCard";

import "./Dashboard.css";

const salesMetricsData = [
  {
    title: "GMV (Gross Merchandise Value)",
    value: "₹3.2L",
    change: "12.5%",
    trend: "up",
    icon: "dollar-sign",
  },
  {
    title: "Net Sales",
    value: "₹2.8L",
    change: "8.3%",
    trend: "up",
    icon: "arrow-trend-up",
  },
  {
    title: "Orders",
    value: "847",
    change: "15.2%",
    trend: "up",
    icon: "arrow-trend-up",
  },
  {
    title: "Units Sold",
    value: "1,243",
    change: "11.4%",
    trend: "up",
    icon: "box",
  },
  {
    title: "Avg Order Value",
    value: "₹3,780",
    change: "2.1%",
    trend: "down",
    icon: "dollar-sign",
  },
  {
    title: "Conversion Rate",
    value: "3.4%",
    change: "0.8%",
    trend: "up",
    icon: "arrow-trend-up",
  },
];

// const enhancedMetricsData = [
//   {
//     title: "Returns Rate",
//     secondaryValue: "2.1%",
//     primaryValue: "", // No main large value below the title
//     primaryTrend: {
//       change: "0.3%",
//       trend: "down",
//       label: "vs last week",
//     },
//     pills: [],
//     iconKey: "chart-line",
//   },
//   {
//     title: "In Stock",
//     secondaryValue: "₹3.2L",
//     primaryValue: "",
//     primaryTrend: {
//       change: "12.5%",
//       trend: "up",
//       label: "vs last week",
//     },
//     pills: [
//       { trend: "up", text: "trendchcor vs last week" },
//       { trend: "down", text: "down" },
//     ],
//     iconKey: "chart-line",
//   },
//   {
//     title: "Live SKUs",
//     secondaryValue: "₹3.2L",
//     primaryValue: "",
//     primaryTrend: {
//       change: "12.5%",
//       trend: "up",
//       label: "vs last week",
//     },
//     pills: [
//       { trend: "up", text: "trer up" },
//       { trend: "down", text: "dc35b" },
//     ],
//     iconKey: "chart-line",
//   },
//   {
//     title: "Actursomers",
//     secondaryValue: "3,421",
//     primaryValue: "",
//     primaryTrend: {
//       change: "18.5%",
//       trend: "up",
//       label: "laswek",
//     },
//     pills: [
//       { trend: "up", text: "n up" },
//       { trend: "down", text: "fce3awn" },
//     ],
//     iconKey: "cube", // Maps to FaCube for the blue box icon
//   },
// ];

function Dashboard() {
  return (
    <div>
      <div className="sales-performance-container">
        {salesMetricsData.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend} // 'up' or 'down'
            iconKey={metric.icon}
          />
        ))}
      </div>

      {/* <div className="sales-performance-container">
        {enhancedMetricsData.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend} // 'up' or 'down'
            iconKey={metric.icon}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Dashboard;
