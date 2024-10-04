import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const EthnicityChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const ethnicityData = data.reduce((acc, item) => {
        const ethnicity = item.ethnicity || 'Unknown';
        const registrationStatus = item.registration_status;

        if (!acc[ethnicity]) {
            acc[ethnicity] = { registered: 0, unregistered: 0 };
        }

        acc[ethnicity][registrationStatus === 'registered' ? 'registered' : 'unregistered'] += 1;
        return acc;
    }, {});

    const chartData = Object.keys(ethnicityData).map(ethnicity => ({
        ethnicity,
        registered: ethnicityData[ethnicity].registered,
        unregistered: ethnicityData[ethnicity].unregistered
    }));

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Ethnicity Breakdown vs Registration Status</h2>
            <ResponsiveContainer width="80%" height={500}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="ethnicity"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #ccc' }}
                        itemStyle={{ color: '#333' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="registered" stackId="a" fill="#2196f3" />
                    <Bar dataKey="unregistered" stackId="a" fill="#ff9800" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EthnicityChart;
