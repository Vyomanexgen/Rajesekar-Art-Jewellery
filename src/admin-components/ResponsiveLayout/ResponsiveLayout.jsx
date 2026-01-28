import React, { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import "./ResponsiveLayout.css";
import { FaBars, FaTimes } from "react-icons/fa";

import MainDashboard from "./Components/MainDashboard/MainDashboard";
import Orders from "./Components/Orders/Orders";
import Products from "./Components/Products/Products";
import Inventory from "./Components/Inventory/Inventory";
import PricingAndDiscounts from "./Components/PricingAndDiscounts/PricingAndDiscounts";
import Promotions from "./Components/Promotions/Promotions";
import Customers from "./Components/Customers/Customers";
import ReviewsAndRatings from "./Components/ReviewsAndRatings/ReviewsAndRatings";
import Shipments from "./Components/Shipments/Shipments";
import Payments from "./Components/Payments/Payments";
import Invoices from "./Components/Invoices/Invoices";
import Analytics from "./Components/Analytics/Analytics";
import Coupons from "./Components/Coupons/Coupons";
import Permissions from "./Components/Permissions/Permissions";

const ResponsiveLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);

  const sidebarContent = (
    <div className="sidebar-links">
      <ul className="list-unstyled">
        <li>
          <NavLink
            to="/"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-table-cells-large"></i> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/orders"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-cart-shopping"></i> Orders
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/products"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-box"></i> Products
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/inventory"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-warehouse"></i> Inventory
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/pricing"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-percent"></i> Pricing & Discounts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/promotions"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-bullhorn"></i> Promotions
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/customers"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-users"></i> Customers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/review"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-star-half-stroke"></i> Reviews & Ratings
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shipments"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-truck"></i> Shipments
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/payments"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-credit-card"></i> Payments
          </NavLink>
        </li>

        {/* <li>
          <NavLink
            to="/invoices"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-file-invoice"></i> Invoices & GST
          </NavLink>
        </li> */}

        {/* <li>
          <NavLink
            to="/analytics"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-chart-line"></i> Analytics
          </NavLink>
        </li> */}

        <li>
          <NavLink
            to="/coupons"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-ticket"></i> Coupons
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/permissions"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebar-link-item active" : "sidebar-link-item"
            }
          >
            <i className="fa-solid fa-user-shield"></i> Permissions
          </NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="responsive-container">
      {/* Mobile top bar */}
      {/* <nav className="d-md-none top-navbar d-flex align-items-center p-3"> */}
      <nav className="d-md-none top-navbar p-3">
        <button
          // className="btn btn-transparent p-0 me-3 toggle-btn"
          className="btn btn-transparent p-0 toggle-btn"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      <div className="main-layout-area d-flex flex-grow-1">
        {/* Desktop Sidebar */}
        <div className="persistent-sidebar d-none d-md-block flex-shrink-0">
          {sidebarContent}
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="sidebar-overlay d-md-none"
            onClick={toggleSidebar}
          ></div>
        )}

        <div
          // className={`mobile-overlay-sidebar d-md-none ${
          //     isSidebarOpen ? "open" : ""
          className={`mobile-overlay-sidebar d-md-none ${isSidebarOpen ? "open" : ""
            }`}
        >
          {sidebarContent}
        </div>

        {/* Content Area */}
        <div className="content-area flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/pricing" element={<PricingAndDiscounts />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/review" element={<ReviewsAndRatings />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
