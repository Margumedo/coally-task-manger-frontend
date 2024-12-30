


import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <div className='text-center'>
                <h1 className="text-4xl font-bold mb-4 text-primary-600 dark:text-primary-300">Error 404</h1>
                <h1 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-300">Página no encontrada</h1>
                <Link to="/" className="underline text-blue-500 ">Volver a inicio</Link>
            </div>
        </div>
    );
};
