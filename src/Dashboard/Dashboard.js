import React, { useState, useEffect } from 'react';
import fetchData from '../api';
import { SimpleGrid, Box, Text, Button } from '@chakra-ui/react';
import GenderChart from '../Components/GenderChart';
import EthnicityChart from '../Components/EthnicityChart';
import RegistrationStatusChart from '../Components/RegistrationStatus';
import RoleDistributionChart from '../Components/RoleDistribution';
import AgeGroupChart from '../Components/AgeGroup';
import TShirtSizeChart from '../Components/TShirtSizeChart';

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
        <Box p={10} bg="#f7f9fc"> 
            <Text fontSize="2xl" fontWeight="bold" mb={8} textAlign="center">
                My Dashboard
            </Text>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>

                <Box bg="white" p={6} borderRadius="md" shadow="md">
                    <Text fontSize="lg" mb={4}>Gender Distribution</Text>
                    <GenderChart data={data} />
                    <Button size="sm" mt={4} colorScheme="blue">Edit report</Button>
                </Box>


                <Box bg="white" p={6} borderRadius="md" shadow="md">
                    <Text fontSize="lg" mb={4}>Ethnicity Breakdown</Text>
                    <EthnicityChart data={data} />
                    <Button size="sm" mt={4} colorScheme="blue">Edit report</Button>
                </Box>


                <Box bg="white" p={6} borderRadius="md" shadow="md">
                    <Text fontSize="lg" mb={4}>Registration Status Overview</Text>
                    <RegistrationStatusChart data={data} />
                    <Button size="sm" mt={4} colorScheme="blue">Edit report</Button>
                </Box>


                <Box bg="white" p={6} borderRadius="md" shadow="md">
                    <Text fontSize="lg" mb={4}>Role Distribution</Text>
                    <RoleDistributionChart data={data} />
                    <Button size="sm" mt={4} colorScheme="blue">Edit report</Button>
                </Box>


                <Box bg="white" p={6} borderRadius="md" shadow="md">
                    <Text fontSize="lg" mb={4}>Age Group Breakdown</Text>
                    <AgeGroupChart data={data} />
                    <Button size="sm" mt={4} colorScheme="blue">Edit report</Button>
                </Box>


                <Box bg="white" p={6} borderRadius="md" shadow="md">
                    <Text fontSize="lg" mb={4}>T-Shirt Size Distribution</Text>
                    <TShirtSizeChart data={data} />
                    <Button size="sm" mt={4} colorScheme="blue">Edit report</Button>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default Dashboard;
