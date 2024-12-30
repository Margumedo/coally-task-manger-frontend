


import React, { createContext, useState, useEffect } from 'react';

interface AuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(sessionStorage.getItem('token') || null);

    useEffect(() => {
        sessionStorage.setItem('token', token || '');
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
