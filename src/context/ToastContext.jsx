import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((message, type = "success", duration = 3500) => {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setToasts((prev) => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const getIcon = (type) => {
        switch (type) {
            case "success":
                return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            case "error":
                return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
            case "warning":
                return <AlertTriangle className="w-5 h-5 text-purple-400 shrink-0" />;
            default:
                return <Info className="w-5 h-5 text-purple-400 shrink-0" />;
        }
    };

    const getStyles = (type) => {
        switch (type) {
            case "success":
                return "border-emerald-500/40 bg-[#131024]/95 text-emerald-200 shadow-[0_4px_25px_rgba(0,0,0,0.7)]";
            case "error":
                return "border-rose-500/40 bg-[#131024]/95 text-rose-200 shadow-[0_4px_25px_rgba(0,0,0,0.7)]";
            case "warning":
                return "border-amber-500/40 bg-[#131024]/95 text-amber-200 shadow-[0_4px_25px_rgba(0,0,0,0.7)]";
            default:
                return "border-purple-500/40 bg-[#131024]/95 text-purple-200 shadow-[0_4px_25px_rgba(0,0,0,0.7)]";
        }
    };

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in ${getStyles(toast.type)}`}
                    >
                        <div className="flex items-center gap-3">
                            {getIcon(toast.type)}
                            <p className="text-xs sm:text-sm font-semibold leading-snug">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-purple-300/60 hover:text-white p-1 rounded-lg transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export default ToastContext;
