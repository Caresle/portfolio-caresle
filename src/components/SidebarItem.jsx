function SidebarItem({ section, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-xl text-left font-medium
        bg-portfolio-white dark:bg-portfolio-white
        text-portfolio-black
        hover:bg-portfolio-gray dark:hover:bg-portfolio-gray
        transition-all duration-200
        ${isActive ? 'ring-2 ring-portfolio-gray' : ''}
      `}
    >
      {section}
    </button>
  )
}

export default SidebarItem
