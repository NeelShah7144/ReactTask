import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const DisplayPage: React.FC = () => {
    const data = useSelector((state: RootState) => state.login.data);

    return (
        <div className="display-page">
            <h1>Login Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DisplayPage;
