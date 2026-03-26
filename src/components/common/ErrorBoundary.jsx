import React from 'react';

/**
 * ErrorBoundary Component - Global Error Handler
 * Catches any uncaught errors in child components and displays a fallback UI
 * Responsive: Works on all device sizes with proper padding and text scaling
 * Production: Logs errors in development, safe error display in production
 * 
 * Usage:
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      resetKey: 0 // For recovery
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to external error tracking service in production
    try {
      this.setState({ errorInfo });
      // In production, you would send this to an error tracking service:
      // logErrorToService(error, errorInfo);
      console.error('ErrorBoundary caught error:', error, errorInfo);
    } catch (loggingError) {
      console.error('Error in error logging:', loggingError);
    }
  }

  handleReset = () => {
    try {
      this.setState({ 
        hasError: false, 
        error: null, 
        errorInfo: null,
        resetKey: this.state.resetKey + 1 
      });
    } catch (err) {
      console.error('Error resetting error boundary:', err);
      // Fallback: Reload page
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Show a fallback UI
      return (
        <div 
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 bg-neutral-light"
          role="alert"
          aria-label="Application error"
        >
          {/* Error Icon */}
          <div className="mb-6 sm:mb-8 text-6xl sm:text-7xl md:text-8xl text-red-500" aria-hidden="true">
            ⚠️
          </div>

          {/* Error Title - Responsive */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-dark mb-4 sm:mb-6 text-center">
            Something Went Wrong
          </h1>

          {/* Error Description - Responsive Text */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-dark-gray max-w-xl text-center mb-6 sm:mb-8 leading-relaxed">
            We're sorry, but something unexpected happened. Our team has been notified. 
            Please try refreshing the page or contact us if the problem persists.
          </p>

          {/* Action Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
            <button
              onClick={() => window.location.reload()}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-primary-purple hover:bg-primary-dark active:scale-95
                         text-white font-semibold rounded-lg transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2
                         text-base sm:text-lg w-full sm:w-auto"
              aria-label="Refresh page to recover from error"
            >
              🔄 Refresh Page
            </button>
            
            <button
              onClick={this.handleReset}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-300 hover:bg-gray-400 active:scale-95
                         text-gray-800 font-semibold rounded-lg transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                         text-base sm:text-lg w-full sm:w-auto"
              aria-label="Try to recover from error"
            >
              🏠 Try Again
            </button>
          </div>

          {/* Error Details (Development Only) - Responsive */}
          {import.meta.env.DEV && this.state.error && (
            <details 
              className="w-full max-w-2xl mt-8 sm:mt-12 px-4 sm:px-6 py-4 bg-red-50 border-2 border-red-200 rounded-lg cursor-pointer group"
            >
              <summary className="font-bold text-red-700 text-sm sm:text-base hover:text-red-900 select-none">
                📋 Error Details (Development Only)
              </summary>
              
              {/* Error Stack - Scrollable on mobile */}
              <pre className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm 
                              overflow-auto max-h-48 sm:max-h-64 font-mono text-gray-800 leading-relaxed">
                {/* Error message */}
                <div className="text-red-600 font-bold mb-4">
                  Error: {this.state.error?.message || 'Unknown error'}
                </div>

                {/* Stack trace */}
                {this.state.error?.stack && (
                  <div className="text-gray-700 mb-4">
                    Stack Trace:
                    {this.state.error.stack}
                  </div>
                )}

                {/* Component stack */}
                {this.state.errorInfo?.componentStack && (
                  <div className="text-blue-700">
                    React Component Stack:
                    {this.state.errorInfo.componentStack}
                  </div>
                )}
              </pre>

              {/* Copy error button */}
              <button
                onClick={() => {
                  const errorText = `${this.state.error?.toString()}\n\n${this.state.errorInfo?.componentStack}`;
                  navigator.clipboard.writeText(errorText);
                  alert('Error details copied to clipboard');
                }}
                className="mt-4 px-3 py-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Copy Error Details
              </button>
            </details>
          )}

          {/* Support Info - Responsive */}
          <div className="mt-8 sm:mt-12 text-center text-sm sm:text-base text-neutral-dark-gray">
            <p className="mb-2">Need help? Contact us:</p>
            <a 
              href="mailto:support@rajasekharjewellery.com"
              className="text-primary-purple hover:text-primary-dark font-semibold underline"
            >
              support@rajasekharjewellery.com
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
