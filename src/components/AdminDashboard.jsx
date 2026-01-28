import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '../admin-components/AdminHeader/AdminHeader';
import ResponsiveLayout from '../admin-components/ResponsiveLayout/ResponsiveLayout';
import '../admin-components/App.css';

const AdminDashboard = ({ setIsAdminAuthenticated }) => {
  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/admin');
    }
  };

  return (
    <BrowserRouter basename="/admin">
      <div className="container-fluid g-0 bgContainer">
        <div className="BgContainerHeader">
          <AdminHeader onLogout={handleLogout} />
        </div>
        <ResponsiveLayout />
      </div>
    </BrowserRouter>
  );
};

export default AdminDashboard;
