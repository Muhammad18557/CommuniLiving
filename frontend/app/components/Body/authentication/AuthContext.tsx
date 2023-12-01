"use client";
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        console.log('login function called');
        console.log(userData);
        setUser(userData);
        // Store token in localStorage or handle cookie
    };

    const logout = () => {
        console.log('logout function called');
        setUser(null);
        // Clear token from localStorage or handle cookie
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
