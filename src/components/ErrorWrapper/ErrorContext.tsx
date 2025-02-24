import { createContext, useContext } from "react";

interface ErrorContextType{
    setError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);
export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error();
    }
    return context;
};
