import "./MainDashboard.css";
import CategoryMix from "./MainDashboardComponents/CategoryMix";
import MainDashboardHeader from "./MainDashboardComponents/MainDashboardHeader";
import OperationalMetrics from "./MainDashboardComponents/OperationalMetrics";
import PaymentMethods from "./MainDashboardComponents/PaymentMethods";
import SalesAndOrdersTrend from "./MainDashboardComponents/SalesAndOrdersTrend";
import SalesPerformance from "./MainDashboardComponents/SalesPerformance";
import StatusCards from "./MainDashboardComponents/StatusCard";
import TopProducts from "./MainDashboardComponents/TopProducts";

function MainDashboard() {
  const metrics = [
    {
      title: "Gross Value",
      value: "₹3.2L",
      change: 12.5,
      isPositive: true,
      icon: "fa-solid fa-dollar-sign",
    },
    {
      title: "Net Sales",
      value: "₹2.8L",
      change: 8.3,
      isPositive: true,
      icon: "fa-solid fa-chart-line",
    },
    {
      title: "Orders",
      value: "847",
      change: 15.2,
      isPositive: true,
      icon: "fa-solid fa-cart-shopping",
    },
    {
      title: "Units Sold",
      value: "1,243",
      change: 11.4,
      isPositive: true,
      icon: "fa-solid fa-box",
    },
    {
      title: "Avg Order Value",
      value: "₹3,780",
      change: -2.1,
      isPositive: false,
      icon: "fa-solid fa-dollar-sign",
    },
    {
      title: "Conversion Rate",
      value: "3.4%",
      change: 0.8,
      isPositive: true,
      icon: "fa-solid fa-arrow-trend-up",
    },
  ];

  const operationsData = [
    {
      title: "Returns Rate",
      value: "2.1%",
      change: -0.3,
      isPositive: false,
      period: "last week",
      icon: "fa-solid fa-triangle-exclamation",
    },
    {
      title: "In-Stock %",
      value: "94.2%",
      change: 1.2,
      isPositive: true,
      period: "last week",
      icon: "fa-solid fa-box",
    },
    {
      title: "Live SKUs",
      value: "1,847",
      change: 0,
      isPositive: true,
      period: "last week",
      icon: "fa-solid fa-box-open",
    },
    {
      title: "Active Customers",
      value: "3,421",
      change: 18.5,
      isPositive: true,
      period: "last month",
      icon: "fa-solid fa-users",
    },
  ];

  const productsData = [
    {
      title: "Gold Plated Temple Necklace Set",
      unitsSold: 45,
      price: "₹89,550",
    },
    { title: "Antique Finish Long Haar", unitsSold: 38, price: "₹75,620" },
    { title: "Traditional Jhumka Earrings", unitsSold: 52, price: "₹62,400" },
    { title: "Designer Bangles Set (6 Pcs)", unitsSold: 29, price: "₹58,000" },
    { title: "Peacock Design Choker Set", unitsSold: 31, price: "₹55,800" },
  ];

  const statusData = [
    {
      icon: "fa-triangle-exclamation",
      title: "Low Stock",
      count: 23,
      note: "Products below reorder point",
      color: "#f4b400",
    },
    {
      icon: "fa-clock",
      title: "Delayed",
      count: 8,
      note: "Shipments past SLA",
      color: "#d93025",
    },
    {
      icon: "fa-check-circle",
      title: "Pending",
      count: 12,
      note: "Awaiting approval",
      color: "#2979ff",
    },
    {
      icon: "fa-dollar-sign",
      title: "High Value",
      count: 5,
      note: "Orders above ₹50,000",
      color: "#1aa260",
    },
  ];

  return (
    <div className="MainDashboardContainer row">
      <div className="col-12">
        <MainDashboardHeader />
      </div>
      <div className="col-12">
        <SalesPerformance data={metrics} />
      </div>
      <div className="col-12">
        <OperationalMetrics metrics={operationsData} />
      </div>
      <div className="col-12 StatsContainerOne">
        <SalesAndOrdersTrend />
        <CategoryMix />
      </div>
      <div className="col-12 StatsContainerOne">
        <PaymentMethods />
        <TopProducts products={productsData} />
      </div>
      <div className="col-12">
        <StatusCards cardData={statusData} />
      </div>
    </div>
  );
}

export default MainDashboard;
