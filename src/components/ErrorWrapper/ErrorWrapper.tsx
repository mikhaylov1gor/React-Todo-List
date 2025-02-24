import { Component, ErrorInfo, ReactNode } from "react";
import { useError } from "./ErrorContext.tsx";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorWrapper extends Component<Props, State> {
    static context = useError;

    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Caught an error:", error, errorInfo);
        this.context?.setError(error.message);
    }

    render() {
        return this.props.children;
    }
}

export default ErrorWrapper;