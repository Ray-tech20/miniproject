// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';


const HomePage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/get'); // Adjust URL if necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Data from API</h1>
            <div>
                {data.map((item, index) => (
                    <div key={index}>
                        <h2>Item {index + 1}</h2>
                        <p><strong>id:</strong> {item.id}</p>
                        <p><strong>Ultrasonic:</strong> {item.ultrasonic}</p>
                        <p><strong>LED Ultrasonic:</strong> {item.led_ultrasonic}</p>
                        <p><strong>LDR:</strong> {item.ldr}</p>
                        <p><strong>LED LDR Pin:</strong> {item.led_ldr_pin}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
