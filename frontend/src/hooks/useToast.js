import { useState, useCallback } from 'react';

let toastId = 0;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = toastId++;
        const newToast = { id, message, type, duration };
        setToasts(prevToasts => [...prevToasts, newToast]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, []);

    const toastSuccess = useCallback((message) => {
        addToast(message, 'success', 3000);
    }, [addToast]);

    const toastError = useCallback((message) => {
        addToast(message, 'error', 4000);
    }, [addToast]);

    const toastInfo = useCallback((message) => {
        addToast(message, 'info', 3000);
    }, [addToast]);

    return {
        toasts,
        addToast,
        removeToast,
        toastSuccess,
        toastError,
        toastInfo
    };
};