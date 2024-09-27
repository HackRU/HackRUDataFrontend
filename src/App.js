import React from 'react';
import './App.css';
import DataList from './Components/DataList';
import GenderChart from './Components/GenderChart';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                
                {/*<DataList /> */}
                <GenderChart />
            </header>
        </div>
    );
}

export default App;
