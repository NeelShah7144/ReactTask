import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Login from './components/login';
import DisplayPage from './components/DisplayPage';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1>Login</h1>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/display" element={<DisplayPage />} />
                        </Routes>
                    </header>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
