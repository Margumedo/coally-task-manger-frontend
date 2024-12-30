
import React, { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';

export const CreateTask: React.FC = () => {
    const { createTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTask({ title, description, completed: false });
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-300">Nueva Tarea</h2>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Título</label>
                    <input
                        className="border w-full px-2 py-1 rounded"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Descripción</label>
                    <input
                        className="border w-full px-2 py-1 rounded"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="bg-primary-500 text-white px-4 py-2 rounded">Guardar</button>
            </form>
        </div>
    );
};
