import { get } from 'http';
import { CircleX } from 'lucide-react';
import React from 'react';

interface ToastProps {
    titulo: string;
    mensaje: string;
    tipo?: 'success' | 'error' | 'info';
}

const Toast = ({ titulo, mensaje, tipo }: ToastProps) => {

    const getBackgroundColor = () => {
        switch (tipo) {
            case 'success':
                return 'bg-green-300';
            case 'error':
                return 'bg-red-300';
            case 'info':
            default:
                return 'bg-blue-300';
        }
    };

    return (
        <div id="toast" className="fixed bottom-5 right-5 z-50">
            <div className={`flex items-center max-w-xs p-4 bg-red-300 text-slate-800 rounded-lg shadow-lg ${getBackgroundColor()}`}>
                <div className="flex-shrink-0">
                    <CircleX />
                </div>
                <div className="ml-3">
                    <h1 className="text-lg font-bold">{titulo}</h1>
                    <p className="text-sm">{mensaje}</p>
                </div>
            </div>
        </div>
    );
}

export default Toast;