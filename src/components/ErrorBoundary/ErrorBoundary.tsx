import React, { Component, ReactNode } from 'react';
import './ErrorBoundary.css';  // Import the CSS for styling

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows a fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service or console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    // Optionally, you can reset the error state to attempt a re-render
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      // Render a friendly error page
      return (
        <div className="error-container">
          <img src="/error-icon.png" alt="Error Icon" className="error-icon" />
          <h1>Oops! Something went wrong.</h1>
          <p>We’re sorry, but there was an issue with this part of the application.</p>
          <button onClick={this.handleRetry} className="error-button">Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
