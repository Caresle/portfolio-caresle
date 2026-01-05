function SidebarItem({ section, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-xl text-left font-medium
        transition-all duration-200
        ${isActive 
          ? 'bg-portfolio-white dark:bg-portfolio-white text-portfolio-black shadow-lg scale-105 border-2 border-portfolio-black/50 dark:border-portfolio-white' 
          : 'bg-portfolio-white dark:bg-portfolio-white text-portfolio-black opacity-60 hover:opacity-80 dark:hover:opacity-90 border-2 border-transparent'
        }
      `}
    >
      {section}
    </button>
  )
}

export default SidebarItem
