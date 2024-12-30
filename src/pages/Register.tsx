import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { axiosIntance } from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ThemeContext } from '../contexts/ThemeContext';
import { AxiosError } from 'axios';

import backgroundImage from '../assets/daniel-korpai-n0mabeJj6_s-unsplash.jpg'

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isDark } = useContext(ThemeContext)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosIntance.post('/auth/register', { email, password });
            if (response.data.success) {
                login(response.data.token);
                navigate('/');

                // Mostrar Sweet Alert al registrarse
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: 'Ahora puedes gestionar tus tareas.',
                    background: isDark ? '#1f2937' : '#fff',
                    color: isDark ? '#f3f4f6' : '#4b5563',
                });

            } else {
                alert('No se pudo crear la cuenta. Revisa los datos ingresados.');
            }
        } catch (error: AxiosError | unknown) {
            console.error('Error registering user:', error);
            // alert('Ocurrió un error al registrar la cuenta. Verifica el correo o inténtalo más tarde.');
            if (error instanceof AxiosError) {
                const { status, data } = error.response || { status: null, data: { message: 'Error desconocido de Axios' } }; // Manejo de response undefined

                if (status === 400) {
                    // Email con formato inválido
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de registro',
                        text: data.message || 'Formato de email errado. Verifica e intenta de nuevo.',
                        background: isDark ? '#1f2937' : '#fff',
                        color: isDark ? '#f3f4f6' : '#4b5563',
                    });
                } else if (status === 409) {
                    // Email ya registrado
                    Swal.fire({
                        icon: 'warning',
                        title: 'Email duplicado',
                        text: data.message || 'Este correo ya está registrado.',
                        background: isDark ? '#1f2937' : '#fff',
                        color: isDark ? '#f3f4f6' : '#4b5563',
                    });
                } else if (status === 500) {
                    // Error interno
                    Swal.fire({
                        icon: 'error',
                        title: 'Error interno',
                        text: 'Ocurrió un error en el servidor. Intenta más tarde.',
                        background: isDark ? '#1f2937' : '#fff',
                        color: isDark ? '#f3f4f6' : '#4b5563',
                    });
                } else {
                    // Otros errores genéricos
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'Ocurrió un error inesperado.',
                        background: isDark ? '#1f2937' : '#fff',
                        color: isDark ? '#f3f4f6' : '#4b5563',
                    });
                }
            } else {
                // No hay response de axios (posible error de red)
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No se pudo conectar con el servidor. Inténtalo más tarde.',
                    background: isDark ? '#1f2937' : '#fff',
                    color: isDark ? '#f3f4f6' : '#4b5563',
                });
            }
        }
    };

    return (
        <div className="login-container relative flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">

            <div className="absolute inset-0 w-full h-full">
                <img
                    src={backgroundImage}
                    alt="Fondo de Register"
                    className="object-cover w-full h-full opacity-60"
                />
            </div>
            <form onSubmit={handleRegister} className="login-form relative z-10 w-80 md:w-96 p-8 bg-white dark:bg-gray-800 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary-600 dark:text-primary-300">Crear Cuenta</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Email</label>
                    <input
                        type="email"
                        className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Coloca un email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Contraseña</label>
                    <input
                        type="password"
                        className="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Coloca una contraseña"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="login-button w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded font-bold transition duration-300">

                    Registrar
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-200 mt-6 text-center">
                    ¿Ya tienes cuenta?
                    <Link to="/login" className="text-primary-500 dark:text-primary-300 hover:underline ml-1">
                        Inicia sesión</Link>
                </p>
            </form>
        </div>
    );
};