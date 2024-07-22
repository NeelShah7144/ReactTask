import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import DisplayPage from './Components/DisplayPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">   
                <header className="App-header">
                    <h1>Login</h1>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/display" element={<DisplayPage />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
};

export default App;
