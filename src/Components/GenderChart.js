import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const GenderChart = () => {
    const [data, setData] = useState([]);

    // Fetch data from the backend
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

    // Prepare data for Recharts, example: gender distribution
    const genderData = data.reduce((acc, item) => {
        const gender = item.gender || 'Unknown';
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(genderData).map(gender => ({
        gender,
        count: genderData[gender]
    }));

    return (
        <div>
            <h2>Gender Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="gender" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GenderChart;