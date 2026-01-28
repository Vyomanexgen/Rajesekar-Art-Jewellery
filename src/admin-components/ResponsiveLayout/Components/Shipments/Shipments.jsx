import { useState } from "react";

import "./Shipments.css";
import ShipmentsStats from "./ShipmentsComponents/ShipmentsStats";
import ShippingPartner from "./ShipmentsComponents/ShippingPartner";
import DeliveryZones from "./ShipmentsComponents/DeliveryZones";
import TrackingDetails from "./ShipmentsComponents/TrackingDetails";

function Shipments() {
  const [partnersData, setPartnersData] = useState([
    {
      name: "BlueDart Express",
      status: "active",
      deliveryType: "Express / Standard",
      deliveryTime: "2-3 days",
      baseRate: "80",
      totalShipments: 1245,
      successRate: 98.5,
      regions: "4",
      image:
        "https://res.cloudinary.com/dfehkiysk/image/upload/v1765179644/BlueDart_obq8qv.jpg",
    },
    {
      name: "DHL Express",
      status: "inactive",
      deliveryType: "International / Premium",
      deliveryTime: "1-2 days",
      baseRate: "150",
      totalShipments: 856,
      successRate: 99.2,
      regions: "2",
      image:
        "https://res.cloudinary.com/dfehkiysk/image/upload/v1765179644/BlueDart_obq8qv.jpg",
    },
  ]);

  const [zones, setZones] = useState([
    {
      zoneName: "Metro Cities",
      locations: "Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad",
      deliveryTime: "1-2 days",
      shippingCost: "80",
      codAvailable: "Yes",
      partners: "2",
    },
    {
      zoneName: "North India",
      locations: "Punjab, Haryana, Rajasthan, UP, Uttarakhand",
      deliveryTime: "3-4 days",
      shippingCost: "100",
      codAvailable: "Yes",
      partners: "2",
    },
  ]);

  // Sample Tracking Data
  const [trackingData] = useState([
    {
      trackingId: "TRK-2024-001",
      orderId: "ORD-2024-1234",
      customer: "Priya Sharma",
      customerPhone: "+91 98765 43210",
      customerEmail: "priya.sharma@example.com",
      shippingPartner: "BlueDart Express",
      origin: "Mumbai Main Warehouse",
      destination: "A-123, Sector 18, Delhi - 110001",
      currentStatus: "In Transit",
      estimatedDelivery: "2024-12-25",
      actualDelivery: null,
      weight: "2.5 kg",
      dimensions: "30x20x15 cm",
      packageType: "Standard Box",
      shippingCost: "₹180",
      paymentMode: "Prepaid",
      priority: "Standard",
      insurance: true,
      insuranceAmount: "₹50,000",
      codAmount: null,
      signature: false,
      notes: "Fragile - Handle with care",
      createdAt: "2024-12-20 10:30:00",
      updatedAt: "2024-12-23 08:30:00",
      timeline: [
        {
          status: "Order Placed",
          location: "Mumbai",
          timestamp: "2024-12-20 10:30 AM",
          description: "Order confirmed and ready for pickup",
          icon: "fa-check-circle",
          completed: true,
        },
        {
          status: "Picked Up",
          location: "Mumbai Main Warehouse",
          timestamp: "2024-12-20 02:15 PM",
          description: "Package picked up by BlueDart courier",
          icon: "fa-box",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Mumbai Hub",
          timestamp: "2024-12-20 06:45 PM",
          description: "Package departed from Mumbai facility",
          icon: "fa-truck",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Delhi Hub",
          timestamp: "2024-12-23 08:30 AM",
          description: "Arrived at Delhi sorting facility",
          icon: "fa-warehouse",
          completed: true,
          current: true,
        },
        {
          status: "Out for Delivery",
          location: "Delhi - Sector 18",
          timestamp: null,
          description: "Expected to be out for delivery",
          icon: "fa-shipping-fast",
          completed: false,
        },
        {
          status: "Delivered",
          location: "Customer Address",
          timestamp: null,
          description: "Package will be delivered",
          icon: "fa-check-double",
          completed: false,
        },
      ],
    },
    {
      trackingId: "TRK-2024-002",
      orderId: "ORD-2024-1235",
      customer: "Rahul Kumar",
      customerPhone: "+91 98765 43211",
      shippingPartner: "DHL Express",
      origin: "Mumbai Main Warehouse",
      destination: "B-456, MG Road, Bangalore - 560001",
      currentStatus: "Delivered",
      estimatedDelivery: "2024-12-22",
      actualDelivery: "2024-12-22",
      weight: "1.2 kg",
      dimensions: "25x15x10 cm",
      packageType: "Express Box",
      shippingCost: "₹250",
      paymentMode: "Prepaid",
      priority: "Express",
      insurance: true,
      insuranceAmount: "₹30,000",
      notes: "",
      timeline: [
        {
          status: "Order Placed",
          location: "Mumbai",
          timestamp: "2024-12-19 09:00 AM",
          description: "Order confirmed",
          icon: "fa-check-circle",
          completed: true,
        },
        {
          status: "Picked Up",
          location: "Mumbai Main Warehouse",
          timestamp: "2024-12-19 11:30 AM",
          description: "Package picked up",
          icon: "fa-box",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Bangalore Hub",
          timestamp: "2024-12-20 08:00 AM",
          description: "Arrived at destination facility",
          icon: "fa-truck",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Bangalore - MG Road",
          timestamp: "2024-12-22 09:00 AM",
          description: "Out for delivery",
          icon: "fa-shipping-fast",
          completed: true,
        },
        {
          status: "Delivered",
          location: "Customer Address",
          timestamp: "2024-12-22 02:30 PM",
          description: "Package delivered successfully",
          icon: "fa-check-double",
          completed: true,
          current: true,
        },
      ],
    },
    {
      trackingId: "TRK-2024-003",
      orderId: "ORD-2024-1236",
      customer: "Anjali Verma",
      customerPhone: "+91 98765 43212",
      shippingPartner: "BlueDart Express",
      origin: "Delhi Hub",
      destination: "C-789, Park Street, Kolkata - 700016",
      currentStatus: "Out for Delivery",
      estimatedDelivery: "2024-12-24",
      actualDelivery: null,
      weight: "3.0 kg",
      dimensions: "35x25x20 cm",
      packageType: "Standard Box",
      shippingCost: "₹200",
      paymentMode: "COD",
      priority: "Standard",
      insurance: false,
      codAmount: "₹8,500",
      notes: "",
      timeline: [
        {
          status: "Order Placed",
          location: "Delhi",
          timestamp: "2024-12-21 10:00 AM",
          description: "Order confirmed",
          icon: "fa-check-circle",
          completed: true,
        },
        {
          status: "Picked Up",
          location: "Delhi Hub",
          timestamp: "2024-12-21 03:00 PM",
          description: "Package picked up",
          icon: "fa-box",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Kolkata Hub",
          timestamp: "2024-12-23 07:00 AM",
          description: "Arrived at Kolkata facility",
          icon: "fa-truck",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Kolkata - Park Street",
          timestamp: "2024-12-23 10:00 AM",
          description: "Out for delivery",
          icon: "fa-shipping-fast",
          completed: true,
          current: true,
        },
        {
          status: "Delivered",
          location: "Customer Address",
          timestamp: null,
          description: "To be delivered",
          icon: "fa-check-double",
          completed: false,
        },
      ],
    },
    {
      trackingId: "TRK-2024-004",
      orderId: "ORD-2024-1237",
      customer: "Vikram Singh",
      customerPhone: "+91 98765 43213",
      shippingPartner: "BlueDart Express",
      origin: "Mumbai Main Warehouse",
      destination: "D-101, Banjara Hills, Hyderabad - 500034",
      currentStatus: "Order Placed",
      estimatedDelivery: "2024-12-26",
      actualDelivery: null,
      weight: "1.8 kg",
      dimensions: "28x18x12 cm",
      packageType: "Standard Box",
      shippingCost: "₹160",
      paymentMode: "Prepaid",
      priority: "Standard",
      insurance: true,
      insuranceAmount: "₹25,000",
      notes: "",
      timeline: [
        {
          status: "Order Placed",
          location: "Mumbai",
          timestamp: "2024-12-23 02:00 PM",
          description: "Order confirmed and ready for pickup",
          icon: "fa-check-circle",
          completed: true,
          current: true,
        },
        {
          status: "Picked Up",
          location: "Mumbai Main Warehouse",
          timestamp: null,
          description: "Awaiting pickup",
          icon: "fa-box",
          completed: false,
        },
        {
          status: "In Transit",
          location: "Hyderabad Hub",
          timestamp: null,
          description: "In transit to destination",
          icon: "fa-truck",
          completed: false,
        },
        {
          status: "Out for Delivery",
          location: "Hyderabad",
          timestamp: null,
          description: "Will be out for delivery",
          icon: "fa-shipping-fast",
          completed: false,
        },
        {
          status: "Delivered",
          location: "Customer Address",
          timestamp: null,
          description: "To be delivered",
          icon: "fa-check-double",
          completed: false,
        },
      ],
    },
    {
      trackingId: "TRK-2024-005",
      orderId: "ORD-2024-1238",
      customer: "Meera Patel",
      customerPhone: "+91 98765 43214",
      shippingPartner: "DHL Express",
      origin: "Delhi Hub",
      destination: "E-202, Satellite Road, Ahmedabad - 380015",
      currentStatus: "Delayed",
      estimatedDelivery: "2024-12-23",
      actualDelivery: null,
      weight: "2.2 kg",
      dimensions: "30x20x15 cm",
      packageType: "Express Box",
      shippingCost: "₹280",
      paymentMode: "Prepaid",
      priority: "Express",
      insurance: true,
      insuranceAmount: "₹40,000",
      notes: "Delayed due to weather conditions",
      timeline: [
        {
          status: "Order Placed",
          location: "Delhi",
          timestamp: "2024-12-18 11:00 AM",
          description: "Order confirmed",
          icon: "fa-check-circle",
          completed: true,
        },
        {
          status: "Picked Up",
          location: "Delhi Hub",
          timestamp: "2024-12-18 04:00 PM",
          description: "Package picked up",
          icon: "fa-box",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Jaipur Hub",
          timestamp: "2024-12-19 10:00 AM",
          description: "Package in transit - Delayed",
          icon: "fa-truck",
          completed: true,
          current: true,
        },
        {
          status: "Out for Delivery",
          location: "Ahmedabad",
          timestamp: null,
          description: "Pending",
          icon: "fa-shipping-fast",
          completed: false,
        },
        {
          status: "Delivered",
          location: "Customer Address",
          timestamp: null,
          description: "To be delivered",
          icon: "fa-check-double",
          completed: false,
        },
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState("shipping");
  const [trackingPartnerFilter, setTrackingPartnerFilter] = useState("All");

  // Calculate stats based on active tab
  const activePartners = partnersData.length;
  const totalShipments = partnersData.reduce((total, item) => {
    return total + item.totalShipments;
  }, 0);
  const totalSuccessRate = partnersData.reduce((total, item) => {
    return total + item.successRate;
  }, 0);
  const avgSuccessRate = totalSuccessRate / activePartners;
  const deliveryZones = zones.length;

  // Tracking stats
  const totalTrackingShipments = trackingData.length;
  const inTransit = trackingData.filter(
    (t) => t.currentStatus === "In Transit"
  ).length;
  const delivered = trackingData.filter(
    (t) => t.currentStatus === "Delivered"
  ).length;
  const delayed = trackingData.filter(
    (t) => t.currentStatus === "Delayed"
  ).length;

  // Dynamic stats based on active tab
  const getStatsData = () => {
    if (activeTab === "tracking") {
      return [
        {
          title: "Total Shipments",
          value: totalTrackingShipments,
          icon: "fa-box",
          bg: "#e9f4ff",
          iconColor: "#3d8bfd",
        },
        {
          title: "In Transit",
          value: inTransit,
          icon: "fa-truck-fast",
          bg: "#fff7df",
          iconColor: "#ffb100",
        },
        {
          title: "Delivered",
          value: delivered,
          icon: "fa-check-circle",
          bg: "#e8f9f1",
          iconColor: "#00A96E",
        },
        {
          title: "Delayed",
          value: delayed,
          icon: "fa-clock",
          bg: "#ffe8e8",
          iconColor: "#ff4444",
        },
      ];
    }

    return [
      {
        title: "Active Partners",
        value: activePartners,
        icon: "fa-handshake",
        bg: "#e9f4ff",
        iconColor: "#3d8bfd",
      },
      {
        title: "Total Shipments",
        value: totalShipments,
        icon: "fa-truck-fast",
        bg: "#e8f9f1",
        iconColor: "#00A96E",
      },
      {
        title: "Avg Success Rate",
        value: avgSuccessRate.toFixed(1),
        icon: "fa-badge-check",
        bg: "#fff7df",
        iconColor: "#ffb100",
      },
      {
        title: "Delivery Zones",
        value: deliveryZones,
        icon: "fa-location-dot",
        bg: "#f3edff",
        iconColor: "#8b5cff",
      },
    ];
  };

  // Handler for viewing tracking from shipping partner
  const handleViewTracking = (partnerName) => {
    setActiveTab("tracking");
    setTrackingPartnerFilter(partnerName);
  };

  return (
    <div className="ShipmentsContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Logistics & Shipments</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage shipping partners, delivery zones, and track shipments
          </p>
        </div>
      </div>
      <ShipmentsStats data={getStatsData()} />

      <div className="toggle-container">
        {/* Toggle Buttons */}
        <div className="toggle-wrapper">
          <button
            className={`toggle-btn ${activeTab === "shipping" ? "active-toggle" : ""
              }`}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping Partners
          </button>

          <button
            className={`toggle-btn ${activeTab === "zones" ? "active-toggle" : ""
              }`}
            onClick={() => setActiveTab("zones")}
          >
            Delivery Zones
          </button>

          <button
            className={`toggle-btn ${activeTab === "tracking" ? "active-toggle" : ""
              }`}
            onClick={() => setActiveTab("tracking")}
          >
            Tracking Details
          </button>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="toggle-content">
          {activeTab === "shipping" && (
            <ShippingPartner
              partnersData={partnersData}
              setPartnersData={setPartnersData}
              onViewTracking={handleViewTracking}
            />
          )}
          {activeTab === "zones" && (
            <DeliveryZones zones={zones} setZones={setZones} />
          )}
          {activeTab === "tracking" && (
            <TrackingDetails
              trackingData={trackingData}
              partnerFilter={trackingPartnerFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Shipments;
