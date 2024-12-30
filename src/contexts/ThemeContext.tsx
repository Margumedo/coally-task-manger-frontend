import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextProps {
    isDark: boolean;
    toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    isDark: false,
    toggleDarkMode: () => { }
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        // lee localStorage para ver si guardamos 'dark' como preferencia
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        console.log(isDark)
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
