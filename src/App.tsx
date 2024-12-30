import React, { useContext } from 'react'
import { AppRouter } from './routes/AppRouter'
import { ToggleDarkMode } from './components/common/ToggleDarkMode'
import { AuthContext } from './contexts/AuthContext';

export const App: React.FC = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen">
      {/* Si tuvieras un navbar, lo colocarías aquí */}
      <header className="p-2 bg-white dark:bg-gray-800 flex justify-end gap-x-4">
        <ToggleDarkMode />
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </header>
      <main>
        <AppRouter />
      </main>
    </div>
  )
}