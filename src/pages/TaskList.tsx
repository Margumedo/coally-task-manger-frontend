
import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const TaskList: React.FC = () => {
    const { tasks, fetchTasks, updateTask, deleteTask } = useContext(TaskContext);

    const [filter, setFilter] = useState('');
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirigir al login si no está autenticado
        } else {
            fetchTasks(filter); // Cargar tareas si está autenticado
        }
    }, [isAuthenticated, filter]); // Agregar filter como dependencia


    const handleToggleComplete = (id: string, completed: boolean) => {
        updateTask(id, { completed: !completed });
    };

    return (
        <div className="min-h-screen  px-20  bg-secondary-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-300">Mis Tareas</h1>
                <div className="space-x-2 gap-x-4">

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100"
                    >
                        <option value="">Todas</option>
                        <option value="completed">Completadas</option>
                        <option value="pending">Pendientes</option>
                    </select>
                    <Link to="/create" className="bg-primary-500 text-white px-3 py-1 rounded">+ Tarea</Link>
                </div>
            </div>

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded shadow">
                        <div>
                            <div className='md:flex  gap-5 mb-3'>
                                <h2 className="text-lg font-semibold">{task.title}</h2>
                                <button
                                    onClick={() => handleToggleComplete(task._id || '', task.completed)}
                                    className={`px-2 py-1 rounded text-white ${task.completed ? 'bg-green-600 hover:bg-green-500' : 'bg-secondary-400 hover:bg-secondary-300'}`}
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
                                onClick={() => deleteTask(task._id || '')}
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
