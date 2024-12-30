
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { Link, useNavigate } from 'react-router-dom';
import { axiosIntance } from '../api/axiosInstance';

import Swal from 'sweetalert2';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosIntance.post('/auth/login', { email, password });
            if (response.data.success) {
                login(response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido al Task Manager',
                    text: 'Has iniciado sesión correctamente.',
                });
                navigate('/');


            }
        } catch (error) {
            console.error('Error logging in:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Por favor verifica tus credenciales.',
            });
        }
    };


    // // Redirigir a Home si ya estoy logueado
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate('/');
    //     }
    // }, [isAuthenticated]);


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-secondary-50 dark:bg-gray-900">
            <form onSubmit={handleLogin} className="w-80 p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-300">Iniciar Sesión</h2>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Email</label>
                    <input
                        type="email"
                        className="border w-full px-2 py-1 rounded"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Contraseña</label>
                    <input
                        type="password"
                        className="border w-full px-2 py-1 rounded"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded mt-4">
                    Entrar
                </button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2">
                ¿No tienes cuenta?
                <Link to="/register" className="text-primary-500 dark:text-primary-300 hover:underline ml-1">Crea tu cuenta</Link>
            </p>
        </div>
    );
};
