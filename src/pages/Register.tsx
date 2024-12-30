import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { axiosIntance } from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ThemeContext } from '../contexts/ThemeContext';
import { AxiosError } from 'axios';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isDark } = useContext(ThemeContext)

    // Decide si deseas loguear automáticamente al usuario después de registrarse.
    // Si prefieres enviarlo al login, no uses `login(response.data.token)` y haz un navigate('/login').

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosIntance.post('/auth/register', { email, password });
            if (response.data.success) {
                // Opción 1: Loguear automáticamente
                login(response.data.token);
                navigate('/');

                // Opción 2: Redirigir a la pantalla de login
                // navigate('/login');


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
        <div className="flex flex-col items-center justify-center h-screen bg-secondary-50 dark:bg-gray-900">
            <form onSubmit={handleRegister} className="w-80 p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-300">Crear Cuenta</h2>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Email</label>
                    <input
                        type="email"
                        className="border w-full px-2 py-1 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Contraseña</label>
                    <input
                        type="password"
                        className="border w-full px-2 py-1 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded mt-4"
                >
                    Registrar
                </button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2">
                ¿Ya tienes cuenta?
                <Link to="/login" className="text-primary-500 dark:text-primary-300 hover:underline ml-1">Inicia sesión</Link>
            </p>
        </div>
    );
};