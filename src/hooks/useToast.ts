import { useState, useRef, useCallback } from 'react';

export interface ToastMessage {
    title: string;
    description: string;
    type: 'success' | 'error' | 'info';
}

export function useToast(duration = 3000) {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<ToastMessage>({ title: '', description: '', type: 'success' });
    const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const triggerToast = useCallback((title: string, description: string, type: ToastMessage['type'] = 'success') => {
        setToastMessage({ title, description, type });
        setShowToast(true);
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => setShowToast(false), duration);
    }, [duration]);

    const dismissToast = useCallback(() => setShowToast(false), []);

    return { showToast, toastMessage, triggerToast, dismissToast };
}
