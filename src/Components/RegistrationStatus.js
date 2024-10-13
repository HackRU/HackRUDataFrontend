import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import fetchData from '../api';

const RegistrationStatusChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    const registrationCounts = data.reduce((acc, item) => {
        const status = item.registration_status === 'registered' ? 'Registered' : 'Unregistered';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const chartData = [
        { name: 'Registered', value: registrationCounts['Registered'] || 0 },
        { name: 'Unregistered', value: registrationCounts['Unregistered'] || 0},
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Registration Status Overview</h2>
            <ResponsiveContainer width="90%" height={500}>
                <PieChart>
                    <Pie 
                        data={chartData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RegistrationStatusChart;