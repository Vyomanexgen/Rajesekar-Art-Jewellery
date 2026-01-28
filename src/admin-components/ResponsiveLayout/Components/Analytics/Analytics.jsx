import SalesAndOrdersTrend from "../MainDashboard/MainDashboardComponents/SalesAndOrdersTrend";
import "./Analytics.css";
import AnalyticsStats from "./AnalyticsComponents/AnalyticsStats";
import CategoryDetails from "./AnalyticsComponents/CategoryDetails";
import TrafficSources from "./AnalyticsComponents/TrafficSources";

function Analytics() {
  const statsData = [
    {
      title: "Total Revenue",
      value: "₹3.2L",
      lastPeriod: "₹2.85L last period",
      changePercent: "12.5%",
      isPositive: true,
      icon: "fa-dollar-sign",
      //   bg: "#e9f4ff",
      iconColor: "#3d8bfd",
    },
    {
      title: "Total Orders",
      value: "847",
      lastPeriod: "735 last period",
      changePercent: "15.2%",
      isPositive: true,
      icon: "fa-cart-shopping",
      //   bg: "#e8f9f1",
      iconColor: "#34c38f",
    },
    {
      title: "New Customers",
      value: "342",
      lastPeriod: "289 last period",
      changePercent: "18.7%",
      isPositive: true,
      icon: "fa-user-group",
      //   bg: "#fff4e5",
      iconColor: "#f7b84b",
    },
    {
      title: "Units Sold",
      value: "1,243",
      lastPeriod: "1,116 last period",
      changePercent: "11.4%",
      isPositive: false,
      icon: "fa-box",
      //   bg: "#f0f0f5",
      iconColor: "#727cf5",
    },
  ];

  const categoryData = [
    {
      category: "Necklaces",
      revenue: "₹1,85,000",
      orders: 342,
      avgOrderValue: "₹541",
      growth: "18.5%",
    },
    {
      category: "Earrings",
      revenue: "₹1,25,000",
      orders: 578,
      avgOrderValue: "₹216",
      growth: "12.3%",
    },
    {
      category: "Bangles",
      revenue: "₹98,000",
      orders: 256,
      avgOrderValue: "₹383",
      growth: "8.7%",
    },
    {
      category: "Rings",
      revenue: "₹67,000",
      orders: 389,
      avgOrderValue: "₹172",
      growth: "-2.1%",
    },
    {
      category: "Anklets",
      revenue: "₹45,000",
      orders: 145,
      avgOrderValue: "₹310",
      growth: "5.6%",
    },
  ];

  const trafficSourcesData = [
    {
      source: "Organic Search",
      visitors: "12,580",
      conversionRate: "3.8%",
      performance: 90,
    },
    {
      source: "Direct",
      visitors: "8,340",
      conversionRate: "4.2%",
      performance: 85,
    },
    {
      source: "Social Media",
      visitors: "6,890",
      conversionRate: "2.9%",
      performance: 65,
    },
    {
      source: "Paid Ads",
      visitors: "5,670",
      conversionRate: "5.1%",
      performance: 95,
    },
    {
      source: "Email",
      visitors: "3,420",
      conversionRate: "6.3%",
      performance: 100,
    },
    {
      source: "Referral",
      visitors: "2,150",
      conversionRate: "3.5%",
      performance: 80,
    },
  ];

  return (
    <div className="AnalyticsContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Analytics & Insights</h2>
          <p className="MainDashboardHeaderSubtitle">
            Comprehensive business intelligence and performance metrics
          </p>
        </div>

        <div className="MainDashboardHeaderControls">
          <button className="MainDashboardHeaderExport">
            <i class="fa-solid fa-download"></i> Export Report
          </button>
        </div>
      </div>
      <AnalyticsStats stats={statsData} />
      <div className="col-12">
        <CategoryDetails data={categoryData} />
      </div>
      <div className="col-12">
        <TrafficSources data={trafficSourcesData} />
      </div>
    </div>
  );
}

export default Analytics;
