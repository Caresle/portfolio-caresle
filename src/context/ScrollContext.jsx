import { createContext, useContext, useState } from 'react'

const ScrollContext = createContext(undefined)

export function ScrollProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ScrollContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}
