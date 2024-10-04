import React from 'react';
import './App.css';
import DataList from './Components/DataList';
import GenderChart from './Components/GenderChart';
import RegistrationStatusChart from './Components/RegistrationStatus';
import RoleDistributionChart from './Components/RoleDistribution';
import EthnicityChart from './Components/Ethnicity';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ marginBottom: '20px' }}> {/* Adjust the margin as needed */}
                    <GenderChart />
                </div>
                <div>
                    <RegistrationStatusChart />
                </div>
                <div>
                    <RoleDistributionChart />
                </div>
                <div>
                    <EthnicityChart />
                </div>
            </header>
        </div>
    );
}

export default App;
