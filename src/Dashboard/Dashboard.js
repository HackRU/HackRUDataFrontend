import React, { useState, useEffect } from 'react';
import fetchData from '../api';
import { SimpleGrid } from '@chakra-ui/react'
import GenderChart from '../Components/GenderChart';
import EthnicityChart from '../Components/EthnicityChart';


const Dashboard = () => {
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

    return (
        <SimpleGrid columns={[1, 2, 2]} spacing={10}> {/* Arranging charts in a grid layout */}
            <GenderChart data={data} />
            <EthnicityChart data={data} />
        </SimpleGrid>
    );
};

export default Dashboard;