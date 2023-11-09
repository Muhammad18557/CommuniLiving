"use client";
import { useEffect, useState } from 'react';
import './dummy.css';
import axios from 'axios';

function Dummy() {
    const [key, setKey] = useState('');
    const [text, setText] = useState('');
    console.log('Dummy component mounted, fetching data...');
    useEffect(() => {
        console.log('Dummy component mounted, fetching data...');
        axios.get('http://localhost:8000/api/dummy/')
            .then(response => {
                console.log('Response:', response.data); // Log the response data
                setKey(response.data.key); // Update the state with the key from response
                setText(response.data.text); // Update the state with the value from response
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 
    return (
        <div className="dummy-container">
            <h1>Testing Data from the backend in this Page</h1>
            <div>
                <p>Key: {key}</p>
                <p>Text: {text}</p>
            </div>
        </div>
    );
}

export default Dummy;
