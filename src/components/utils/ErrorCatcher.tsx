import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorScreen from './ErrorScreen'; // Make sure this path is correct

interface ErrorCatcherProps {
  children: ReactNode;
}

interface ErrorCatcherState {
  hasError: boolean;
}

class ErrorCatcher extends Component<ErrorCatcherProps, ErrorCatcherState> {
  constructor(props: ErrorCatcherProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorCatcherState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorScreen />;
    }

    return this.props.children; 
  }
}

export default ErrorCatcher;
