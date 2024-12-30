
import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaRegPlusSquare } from "react-icons/fa";
import { ThemeContext } from '../contexts/ThemeContext';

export const TaskList: React.FC = () => {
    const { tasks, fetchTasks, updateTask, deleteTask } = useContext(TaskContext);

    const [filter, setFilter] = useState('');
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isDark } = useContext(ThemeContext)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirigir al login si no está autenticado
        } else {
            fetchTasks(filter); // Cargar tareas si está autenticado
        }
    }, [isAuthenticated, filter]); // Agregar filter como dependencia

    // En tu lógica de eliminar tarea
    const handleDeleteTask = async (id: string) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro de eliminar la tarea?',
            text: 'Esta acción no se puede deshacer',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#f30b0b79',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f3f4f6' : '#4b5563',
        });

        if (result.isConfirmed) {
            // Se ejecuta la eliminación
            try {
                await deleteTask(id); // tu lógica
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminada',
                    text: 'La tarea ha sido eliminada',
                    background: '#1f2937',
                    color: '#f3f4f6',
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar la tarea',
                });
            }
        }
    };

    const handleToggleComplete = (id: string, completed: boolean) => {
        updateTask(id, { completed: !completed });
    };

    return (
        <div className="min-h-screen md:px-20  bg-secondary-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
            <div className="md:flex justify-between items-center mb-4 ">
                <h1 className="text-2xl mb-4 md:mb-0  font-bold text-primary-600 dark:text-primary-300">Mis Tareas</h1>
                <div className="space-x-2 flex gap-x-3 justify-between">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100"
                    >
                        <option value="">Todas</option>
                        <option value="completed">Completadas</option>
                        <option value="pending">Pendientes</option>
                    </select>
                    <Link to="/create" className="flex items-center justify-center gap-x-2 bg-primary-500 text-white px-4 py-1 rounded">
                        <FaRegPlusSquare className='w-5 h-5 ' />
                        <p className='hidden md:block'>Nueva Tarea </p>
                    </Link>

                </div>
            </div>

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded shadow">
                        <div>
                            <div className='md:flex  gap-5 mb-3'>
                                <h2 className="text-lg font-semibold">{task.title}</h2>
                                <button
                                    onClick={() => handleToggleComplete(task._id || '', task.completed)}
                                    className={`px-2 py-1 rounded text-white border ${task.completed ? 'border-green-600 text-green-600 hover:bg-green-500 hover:text-white ' : 'border-secondary-400 text-secondary-400 hover:bg-secondary-500 hover:text-white'}`}

                                >
                                    {task.completed ? 'Completada' : 'Pendiente'}
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-200">{task.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Creada: {new Date(task.createdAt || '').toLocaleDateString()}</p>
                        </div>

                        <div className="flex items-center space-x-2">

                            <Link
                                to={`/update/${task._id}`}
                                className="px-2 py-1 bg-blue-500 hover:bg-blue-400 rounded text-white"
                            >
                                Editar
                            </Link>
                            <button
                                onClick={() => handleDeleteTask(task._id || '')}
                                className="px-2 py-1 bg-red-500 hover:bg-red-400 rounded text-white"


                            >
                                Eliminar
                            </button>

                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
};
