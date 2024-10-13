import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TShirtSizeChart = ({ data }) => {
    const tshirtSizeData = data.reduce((acc, item) => {
        const size = item.shirt_size || 'Unknown';
        acc[size] = (acc[size] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(tshirtSizeData).map(size => ({
        name: size,  
        value: tshirtSizeData[size],
    }));

    return (
        <div className="flex flex-col items-center justify-center h-screen  p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">T-Shirt Size Distribution</h2>
            <ResponsiveContainer width="80%" height={500}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
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

export default TShirtSizeChart;
