import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import AppContent from './components/AppContent'

function App() {
  const [theme, setTheme] = useState('dark')
  const [activeSection, setActiveSection] = useState('Experience')

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="flex h-screen bg-portfolio-white dark:bg-portfolio-black transition-colors duration-300">
      <Sidebar 
        theme={theme} 
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <AppContent activeSection={activeSection} />
    </div>
  )
}

export default App
