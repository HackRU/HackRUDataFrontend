import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import fetchData from '../api';

const GenderChart = () => {
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

    const validGenders = ['Female', 'Male', 'Unknown', 'Prefer not to say', 'Other', 'Nonbinary'];
    const genderData = data.reduce((acc, item) => {
        const gender = item.gender || 'Unknown';
        if (validGenders.includes(gender)) {
            acc[gender] = (acc[gender] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(genderData).map(gender => ({
        gender,
        count: genderData[gender]
    }));

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Gender Distribution</h2>
            <ResponsiveContainer width={500} height={500}> 
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}> 
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="gender" 
                        angle={-60} 
                        textAnchor="end" 
                        height={60} 
                        tickSize={30} 
                        interval={0} 
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#4f46e5"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GenderChart;