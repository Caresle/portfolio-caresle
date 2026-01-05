import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import AppContent from './components/AppContent'
import { ScrollProvider } from './context/ScrollContext'
import { sections } from './constants/sections'

function App() {
  const [theme, setTheme] = useState('dark')
  const [activeSection, setActiveSection] = useState('Experience')

  // Section navigation helpers
  const getSectionIndex = (section) => sections.indexOf(section)

  const getNextSection = (currentSection) => {
    const currentIndex = getSectionIndex(currentSection)
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null
  }

  const getPreviousSection = (currentSection) => {
    const currentIndex = getSectionIndex(currentSection)
    return currentIndex > 0 ? sections[currentIndex - 1] : null
  }

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
    <ScrollProvider>
      <div className="flex h-screen bg-portfolio-white dark:bg-portfolio-black transition-colors duration-300">
        <Sidebar 
          theme={theme} 
          toggleTheme={toggleTheme}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <AppContent 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          getNextSection={getNextSection}
          getPreviousSection={getPreviousSection}
        />
      </div>
    </ScrollProvider>
  )
}

export default App
