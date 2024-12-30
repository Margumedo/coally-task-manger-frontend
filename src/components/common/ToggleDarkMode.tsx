
import React, { useContext } from 'react';

import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ToggleDarkMode: React.FC = () => {

    const { isDark, toggleDarkMode } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleDarkMode}
            className=" flex items-center justify-center ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700  text-gray-700 dark:text-gray-100 rounded transition-colors"
        >
            {isDark ? (
                // Si es dark, mostramos el ícono del Sol (para cambiar a claro)

                < FaSun className="w-5 h-5" />
            ) : (
                // Si es claro, mostramos el ícono de la Luna (para cambiar a oscuro)
                <FaMoon className="w-5 h-5" />
            )}
        </button>
    );
};
