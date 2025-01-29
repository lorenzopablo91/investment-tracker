'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

function AutoRefresh() {
    const router = useRouter();
    const REFRESH_TIME = 90;
    const [countdown, setCountdown] = useState(REFRESH_TIME);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    handleRefresh();
                    return REFRESH_TIME;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.refresh();
        setTimeout(() => setIsRefreshing(false), 1000);
    }

    const progress = ((REFRESH_TIME - countdown) / REFRESH_TIME) * 100;

    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600">
                Próxima actualización en {countdown}s
            </span>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default AutoRefresh;