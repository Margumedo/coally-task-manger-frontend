import { createContext, useContext, useState } from "react"
import { AuthContext } from "./AuthContext"
import { axiosIntance } from "../api/axiosInstance";



interface Task {
    _id?: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt?: string;
}

interface TaskContextProps {
    tasks: Task[];
    fetchTasks: (filter?: string) => Promise<void>;
    createTask: (data: Omit<Task, '_id'>) => Promise<void>;
    updateTask: (id: string, data: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps>({

    tasks: [],
    fetchTasks: async () => { },
    createTask: async () => { },
    updateTask: async () => { },
    deleteTask: async () => { }
})


export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { token } = useContext(AuthContext)

    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async (status?: string) => {
        try {
            const response = await axiosIntance.get(`/tasks${status ? `?status=${status}` : ''}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            setTasks(response.data.data)

        } catch (error) {
            console.error(`Error en el fetching de task: ${error}`)
        }
    }

    const createTask = async (data: Omit<Task, '_id'>) => {

        try {
            const response = await axiosIntance.post('/tasks', data, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                console.log('tarea creada')
            }
            fetchTasks();

        } catch (error) {
            console.error(`Error al crear la tarea: ${error}`)
        }
    }

    const updateTask = async (id: string, data: Partial<Task>) => {

        try {
            await axiosIntance.put(`/tasks/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchTasks();
        } catch (error) {
            console.error(`Error al actualizar la tarea: ${error}`)
        }
    }

    const deleteTask = async (id: string) => {

        try {
            await axiosIntance.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchTasks();
        } catch (error) {
            console.error(`Error al borrar la tarea: ${error}`)
        }
    }


    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}