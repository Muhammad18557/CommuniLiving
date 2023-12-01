"use client";
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Initialize community from local storage
    const [community, setCommunity] = useState(() => {
        const storedCommunity = localStorage.getItem('community');
        return storedCommunity ? JSON.parse(storedCommunity) : null;
    });
    
    
    const login = (userData) => {
        console.log('login function called');
        console.log(userData);
        setUser(userData);
    
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        console.log('logout function called');
        setUser(null);
    
        // Clear user data from localStorage
        localStorage.removeItem('user');
    };    

    const setCommunityData = (communityData) => {
        console.log('setCommunityData function called');
        console.log(communityData);
        setCommunity(communityData);
        localStorage.setItem('community', JSON.stringify(communityData));
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, community, setCommunityData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
