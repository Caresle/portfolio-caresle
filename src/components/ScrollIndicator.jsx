function ScrollIndicator({ direction, visible }) {
  if (!visible) return null

  const isDown = direction === 'down'
  const positionClass = isDown ? 'bottom-12' : 'top-12'

  return (
    <div 
      className={`absolute ${positionClass} left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-pulse-subtle transition-opacity duration-300`}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-8 h-8 text-portfolio-black dark:text-portfolio-white opacity-50"
      >
        {isDown ? (
          // Chevron Down
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        ) : (
          // Chevron Up
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        )}
      </svg>
    </div>
  )
}

export default ScrollIndicator
