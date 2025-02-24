import React, { createContext, useContext, useState, ReactNode } from "react";
import ErrorModal from "./ErrorModal.tsx";

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
