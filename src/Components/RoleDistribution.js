import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import fetchData from '../api';

const RoleDistributionChart = () => {
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

    const roleData = data.reduce((acc, item) => {
        const role = Object.keys(item.role).find(role => item.role[role]);
        const registrationStatus = item.registration_status;

        if (role) {
            if (!acc[role]) {
                acc[role] = { registered: 0, unregistered: 0 };
            }
            acc[role][registrationStatus === 'registered' ? 'registered' : 'unregistered'] += 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(roleData).map(role => ({
        role,
        registered: roleData[role].registered,
        unregistered: roleData[role].unregistered
    }));

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Role Distribution vs Registration Status</h2>
            <ResponsiveContainer width="80%" height={500}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="registered" stackId="a" fill="#4caf50" />
                    <Bar dataKey="unregistered" stackId="a" fill="#f44336" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RoleDistributionChart;
