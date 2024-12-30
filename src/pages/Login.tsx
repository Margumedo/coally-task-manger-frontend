import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { Link, useNavigate } from 'react-router-dom';
import { axiosIntance } from '../api/axiosInstance';

import Swal from 'sweetalert2';
import { ThemeContext } from '../contexts/ThemeContext';

import backgroundImage from '../assets/daniel-korpai-n0mabeJj6_s-unsplash.jpg'

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isDark } = useContext(ThemeContext);

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
                    background: isDark ? '#1f2937' : '#fff',
                    color: isDark ? '#f3f4f6' : '#4b5563',
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Por favor verifica tus credenciales.',
                background: isDark ? '#1f2937' : '#fff',
                color: isDark ? '#f3f4f6' : '#4b5563',
            });
        }
    };

    return (

        <div className="login-container relative flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={backgroundImage}
                    alt="Fondo de Login"
                    className="object-cover w-full h-full opacity-60"
                />
            </div>
            <form onSubmit={handleLogin} className="login-form relative z-10 w-80 md:w-96 p-8 bg-white dark:bg-gray-800 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary-600 dark:text-primary-300">Iniciar Sesión</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Email</label>
                    <input
                        type="email"
                        className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingrese su email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Contraseña</label>
                    <input
                        type="password"
                        className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <button
                    type="submit"
                    className="login-button w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded font-bold transition duration-300">
                    Entrar
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-200 mt-6 text-center">
                    ¿No tienes cuenta?
                    <Link to="/register" className="text-primary-500 dark:text-primary-300 hover:underline transition duration-300 ml-1">
                        Crea tu cuenta
                    </Link>
                </p>
            </form>
        </div>
    );
};