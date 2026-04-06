import { AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import type { ToastMessage } from '../hooks/useToast';

interface ToastNotificationProps {
    show: boolean;
    message: ToastMessage;
    onDismiss: () => void;
}

const iconStyles = {
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
};

export default function ToastNotification({ show, message, onDismiss }: ToastNotificationProps) {
    if (!show) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
            <div className="bg-popover rounded-xl shadow-2xl shadow-black/10 border border-border p-4 flex items-start gap-4 max-w-sm">
                <div className={`mt-0.5 p-1 rounded-full ${iconStyles[message.type]}`}>
                    {message.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5" />
                    ) : message.type === 'info' ? (
                        <FileText className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{message.title}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{message.description}</p>
                </div>
                <button onClick={onDismiss} className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors">
                    <span className="sr-only">Close</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
