import React from 'react';

const SignIn = ({
  signInForm,
  setSignInForm,
  handleSignIn,
  handleGoogleSignIn,
  setShowSignIn,
  setShowSignUp,
  setShowCheckout,
  setCheckoutStep,
  setShowTermsPrivacyPopup
}) => {
  return (
    <div className="auth-page-wrapper show-sign-in">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSignIn}>
          <h2 className="auth-title">Sign In</h2>
          
          <div className="auth-field">
            <label className="auth-label">Email Address *</label>
            <input
              type="email"
              className="auth-input"
              placeholder="you@email.com"
              value={signInForm.email}
              onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password *</label>
            <div className="auth-input-wrapper">
              <input
                type={signInForm.showPassword ? "text" : "password"}
                className="auth-input"
                placeholder="Enter your password"
                value={signInForm.password}
                onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setSignInForm({ ...signInForm, showPassword: !signInForm.showPassword })}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 3.75C6.25 3.75 3.125 6.25 1.875 10C3.125 13.75 6.25 16.25 10 16.25C13.75 16.25 16.875 13.75 18.125 10C16.875 6.25 13.75 3.75 10 3.75Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="auth-options">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={signInForm.rememberDevice}
                onChange={(e) => setSignInForm({ ...signInForm, rememberDevice: e.target.checked })}
              />
              <span>Remember this device</span>
            </label>
            <a href="#" className="auth-link">Forgot password?</a>
          </div>

          <div className="auth-checkboxes">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={signInForm.termsAgreed}
                onChange={(e) => setSignInForm({ ...signInForm, termsAgreed: e.target.checked })}
                required
              />
              <span 
                className="auth-terms-full-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTermsPrivacyPopup(true);
                }}
              >
                I agree to the Terms and Privacy Policies
              </span>
            </label>
          </div>

          <button type="button" className="auth-continue-link" onClick={() => { setShowSignIn(false); setShowCheckout(true); setCheckoutStep('address'); }}>
            Continue without account
          </button>

          <div className="auth-separator">
            <span>or</span>
          </div>

          <button type="button" className="auth-google-btn" onClick={handleGoogleSignIn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6 10.2273C19.6 9.51818 19.5364 8.83636 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z" fill="#4285F4"/>
              <path d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5773L13.3864 15.0682C12.4909 15.6682 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z" fill="#34A853"/>
              <path d="M4.40455 11.9C4.20455 11.3 4.09091 10.6591 4.09091 10C4.09091 9.34091 4.20455 8.7 4.40455 8.1V5.50909H1.06364C0.386364 6.85909 0 8.38636 0 10C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.9Z" fill="#FBBC05"/>
              <path d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-divider"></div>

          <p className="auth-switch-text">
            Don't have an account? <a href="#" className="auth-switch-link" onClick={(e) => { e.preventDefault(); setShowSignIn(false); setShowSignUp(true); }}>Sign up</a>
          </p>

          <button type="submit" className={`auth-submit-btn ${!signInForm.termsAgreed ? 'disabled' : ''}`} disabled={!signInForm.termsAgreed}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

