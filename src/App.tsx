import React, { useContext } from 'react'
import { AppRouter } from './routes/AppRouter'
import { ToggleDarkMode } from './components/common/ToggleDarkMode'
import { AuthContext } from './contexts/AuthContext';

export const App: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="min-h-screen">
      <header className="p-2 bg-white dark:bg-gray-800 flex justify-end gap-x-4">
        <ToggleDarkMode />
        {
          isAuthenticated &&
          <button onClick={logout} className="bg-red-500 dark:bg-primary-800 text-white px-3 py-1 rounded">Logout</button>
        }
      </header>
      <main>
        <AppRouter />
      </main>
    </div>
  )
}
