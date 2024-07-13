import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="py-5 text-center">
                    <h2 className="text-2xl font-bold text-red-500">Something went wrong.</h2>
                    <p className="text-md text-gray-700">Please try refreshing the page or contact support.</p>
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
