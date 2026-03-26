import React from 'react';

/**
 * LogoutConfirmDialog component - Confirms user logout
 */
const LogoutConfirmDialog = ({ showLogoutConfirm, handlers, onLogoutConfirm }) => {
  if (!showLogoutConfirm) {
    return null;
  }

  const handleLogout = () => {
    handlers.setIsLoggedIn(false);
    handlers.setUserDetails(null);
    handlers.setShowLogoutConfirm(false);
    handlers.setShowAccountPage(false);
    handlers.setShowCheckout(false);
    handlers.setShowCartModal(false);
    handlers.setShowWishlist(false);
    handlers.setShowOrdersPage(false);
    handlers.closeAllPages();
    handlers.setShowSignIn(true);
    handlers.setShowSignUp(false);
    
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/signin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    onLogoutConfirm?.();
  };

  return (
    <div className="logout-confirm-overlay" onClick={() => handlers.setShowLogoutConfirm(false)}>
      <div className="logout-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="logout-confirm-title">Confirm Logout</h3>
        <p className="logout-confirm-message">
          Are you sure you want to log out? You'll need to sign in again to access your account.
        </p>
        <div className="logout-confirm-buttons">
          <button
            className="logout-confirm-cancel"
            onClick={() => handlers.setShowLogoutConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="logout-confirm-logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmDialog;
