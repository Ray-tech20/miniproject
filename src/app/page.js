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

    // ฟังก์ชันเพื่ออัปเดตค่า 0 หรือ 1 ไปที่ API
    const handleUpdate = async (id, value) => {
        try {
            const response = await fetch('/api/iot', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({led_status: value }),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            // อัปเดตสถานะการแสดงผลในหน้า
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? { ...item, led_status: value } : item
                )
            );
        } catch (error) {
            console.error('Error updating data:', error);
            setError(error);
        }
    };

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
                        <p><strong>LED Status:</strong> {item.led_status}</p>
                        {/* ปุ่มเพื่ออัปเดตสถานะ LED */}
                        <button onClick={() => handleUpdate(item.id, 0)}>Set LED Status to 0</button>
                        <button onClick={() => handleUpdate(item.id, 1)}>Set LED Status to 1</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
