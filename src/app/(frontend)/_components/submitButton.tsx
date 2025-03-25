'use client'
import { CircleX } from 'lucide-react';
import React, { useEffect } from 'react';

interface ToastProps {
    titulo: string;
    mensaje: string;
    tipo?: 'success' | 'error' | 'info';
}

const Toast = ({ titulo, mensaje, tipo = 'info' }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            const toastElement = document.getElementById('toast');
            if (toastElement) {
                toastElement.classList.add('opacity-0');
                setTimeout(() => {
                    toastElement.remove();
                }, 500);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

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
        <div id="toast" className={`fixed bottom-5 right-5 z-50 transition-opacity duration-500 ${getBackgroundColor()}`}>
            <div className="flex items-center max-w-xs p-4 text-slate-800 rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                    <CircleX />
                </div>
                <div className="ml-3">
                    <h1 className="text-lg font-bold">{tipo.toUpperCase()}</h1>
                    <p className="text-sm">{mensaje}</p>
                </div>
            </div>
        </div>
    );
}

export default Toast;