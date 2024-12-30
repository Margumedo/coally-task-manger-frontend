import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskContext } from '../contexts/TaskContext';
import Swal from 'sweetalert2';

export const UpdateTask: React.FC = () => {
    const { tasks, updateTask } = useContext(TaskContext);
    const navigate = useNavigate();
    const { id } = useParams(); // Captura el ID de la tarea de la URL

    // Estado para editar la tarea
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Buscar la tarea en la lista de tasks usando el ID
        const taskToEdit = tasks.find((task) => task._id === id);
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setCompleted(taskToEdit.completed);
        } else {
            // Si no se encontró la tarea, regresar a la lista
            navigate('/');
        }
    }, [id, tasks]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        // Llamar a updateTask del contexto
        if (id) {
            await updateTask(id, { title, description, completed });
            Swal.fire({
                icon: 'success',
                title: 'Atualización Exitosa',
                text: 'Haz actualizado tu tarea',
            });
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-gray-900">
            <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-800 p-4 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-300">Editar Tarea</h2>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Título</label>
                    <input
                        className="border w-full px-2 py-1 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-100">Descripción</label>
                    <input
                        className="border w-full px-2 py-1 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-2 flex items-center">
                    <input
                        id="completed"
                        type="checkbox"
                        className="mr-2"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    <label htmlFor="completed" className="text-gray-700 dark:text-gray-100">
                        ¿Completada?
                    </label>
                </div>
                <button className="bg-primary-500 text-white px-4 py-2 rounded mt-2">Guardar</button>
            </form>
        </div>
    );
};