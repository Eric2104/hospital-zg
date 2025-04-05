'use client'
import React, { useEffect, useState } from "react";

const TimerHeader = () => {

    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                new Intl.DateTimeFormat("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }).format(now)
            );
            setDate(
                new Intl.DateTimeFormat("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }).format(now)
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full lg:text-end  grid grid-cols-2 gap-2 justify-around lg:block">
            <p className="font-mono text-lg lg:text-4xl">{time.toUpperCase()}</p>
            <p className="font-mono text-end ">{date}</p>
        </div>
    );
}

export default TimerHeader;