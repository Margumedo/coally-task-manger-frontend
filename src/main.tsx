
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

import './styles/taildwind.css'
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
)