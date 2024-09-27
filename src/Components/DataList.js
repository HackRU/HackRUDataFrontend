import React, { useState, useEffect } from "react";
import axios from 'axios';

const DataList = () => {
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

    return (
        <div>
          <h1>User Data</h1>
          <ul>
            {data.map((user, index) => (
              <li key={index}>{JSON.stringify(user)}</li>
            ))}
          </ul>
        </div>
      );
    };
    
export default DataList;