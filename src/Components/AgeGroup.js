import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import dayjs from 'dayjs';

const AgeGroupChart = () => {
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


    const getAge = (dob) => dayjs().diff(dayjs(dob), 'year');
    const getAgeGroup = (age) => {
        if (age < 18) return 'Under 18';
        if (age >= 18 && age <= 24) return '18-24';
        if (age >= 25 && age <= 34) return '25-34';
        if (age >= 35 && age <= 44) return '35-44';
        if (age >= 45 && age <= 54) return '45-54';
        if (age >= 55 && age <= 64) return '55-64';
        return '65+';
    };


    const ageGroupData = data.reduce((acc, item) => {
        const age = getAge(item.date_of_birth);
        const ageGroup = getAgeGroup(age);
        const registrationStatus = item.registration_status;

        if (!acc[ageGroup]) {
            acc[ageGroup] = { registered: 0, unregistered: 0 };
        }

        acc[ageGroup][registrationStatus === 'registered' ? 'registered' : 'unregistered'] += 1;
        return acc;
    }, {});

    const chartData = Object.keys(ageGroupData).map(ageGroup => ({
        ageGroup,
        registered: ageGroupData[ageGroup].registered,
        unregistered: ageGroupData[ageGroup].unregistered
    }));

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Age Group Breakdown vs Registration Status</h2>
            <ResponsiveContainer width="80%" height={500}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="ageGroup" 
                        angle={-45} 
                        textAnchor="end"
                        height={80} 
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="registered" stackId="a" fill="#4caf50" /> 
                    <Bar dataKey="unregistered" stackId="a" fill="#f44336" /> 
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AgeGroupChart;