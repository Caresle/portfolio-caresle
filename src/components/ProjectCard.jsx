import { useState, useEffect } from 'react'

function ProjectCard({ 
  project, 
  onSwipeLeft, 
  onSwipeRight, 
  direction, 
  canSwipeLeft, 
  canSwipeRight, 
  onDragOffsetChange, 
  isBackground = false,
  onClick 
}) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [interactionStartTime, setInteractionStartTime] = useState(null)

  const minSwipeDistance = 50
  const maxDragDistance = 150
  const clickDragThreshold = 5
  const clickTimeThreshold = 200

  useEffect(() => {
    if (direction !== 0) {
      setAnimate(true)
      const timer = setTimeout(() => {
        setAnimate(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [direction])

  useEffect(() => {
    if (onDragOffsetChange && !isBackground) {
      onDragOffsetChange(dragOffset)
    }
  }, [dragOffset, onDragOffsetChange, isBackground])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
    setInteractionStartTime(Date.now())
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
    if (touchStart) {
      const offset = e.targetTouches[0].clientX - touchStart
      // Limit drag distance and prevent dragging in disabled directions
      if ((offset > 0 && !canSwipeRight) || (offset < 0 && !canSwipeLeft)) {
        setDragOffset(offset * 0.1) // Reduced resistance effect
      } else {
        setDragOffset(Math.max(-maxDragDistance, Math.min(maxDragDistance, offset)))
      }
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false)
      setDragOffset(0)
      setInteractionStartTime(null)
      return
    }
    
    const distance = touchStart - touchEnd
    const dragDistance = Math.abs(distance)
    const interactionDuration = Date.now() - interactionStartTime

    // Check if it's a click (minimal drag, quick interaction)
    if (dragDistance < clickDragThreshold && interactionDuration < clickTimeThreshold) {
      handleClick()
    } else {
      // It's a swipe
      const isLeftSwipe = distance > minSwipeDistance && canSwipeLeft
      const isRightSwipe = distance < -minSwipeDistance && canSwipeRight
      
      if (isLeftSwipe) {
        onSwipeLeft()
      } else if (isRightSwipe) {
        onSwipeRight()
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
    setTouchEnd(null)
    setInteractionStartTime(null)
  }

  const onMouseDown = (e) => {
    setTouchEnd(null)
    setTouchStart(e.clientX)
    setIsDragging(true)
    setInteractionStartTime(Date.now())
  }

  const onMouseMove = (e) => {
    if (!isDragging) return
    setTouchEnd(e.clientX)
    if (touchStart) {
      const offset = e.clientX - touchStart
      // Limit drag distance and prevent dragging in disabled directions
      if ((offset > 0 && !canSwipeRight) || (offset < 0 && !canSwipeLeft)) {
        setDragOffset(offset * 0.1) // Reduced resistance effect
      } else {
        setDragOffset(Math.max(-maxDragDistance, Math.min(maxDragDistance, offset)))
      }
    }
  }

  const onMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false)
      setDragOffset(0)
      setInteractionStartTime(null)
      return
    }
    
    const distance = touchStart - touchEnd
    const dragDistance = Math.abs(distance)
    const interactionDuration = Date.now() - interactionStartTime

    // Check if it's a click (minimal drag, quick interaction)
    if (dragDistance < clickDragThreshold && interactionDuration < clickTimeThreshold) {
      handleClick()
    } else {
      // It's a swipe
      const isLeftSwipe = distance > minSwipeDistance && canSwipeLeft
      const isRightSwipe = distance < -minSwipeDistance && canSwipeRight
      
      if (isLeftSwipe) {
        onSwipeLeft()
      } else if (isRightSwipe) {
        onSwipeRight()
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
    setTouchEnd(null)
    setInteractionStartTime(null)
  }

  const handleClick = () => {
    if (project.isSpecialCard) {
      // Open external links for special card
      if (project.links.github) {
        window.open(project.links.github, '_blank', 'noopener,noreferrer')
      }
      if (project.links.youtube) {
        window.open(project.links.youtube, '_blank', 'noopener,noreferrer')
      }
    } else {
      // Open modal for regular project
      if (onClick) {
        onClick(project)
      }
    }
  }

  // Check if technology icon exists
  const getIconPath = (tech) => {
    return `/skills/${tech}-icon.svg`
  }

  const handleIconError = (e, tech) => {
    // Try alternative pattern
    const altPath = `/skills/${tech}.svg`
    if (e.target.src !== window.location.origin + altPath) {
      e.target.src = altPath
    } else {
      // Both patterns failed, hide the icon
      e.target.style.display = 'none'
    }
  }

  return (
    <div
      className={`
        bg-portfolio-white dark:bg-portfolio-white 
        rounded-2xl p-8 shadow-lg
        select-none
        transition-transform duration-300
        ${!isBackground ? 'cursor-grab active:cursor-grabbing' : ''}
        ${animate ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
      `}
      style={{
        transform: isDragging && !isBackground ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)` : 'none',
        transition: isDragging ? 'none' : 'transform 0.3s ease'
      }}
      onTouchStart={!isBackground ? onTouchStart : undefined}
      onTouchMove={!isBackground ? onTouchMove : undefined}
      onTouchEnd={!isBackground ? onTouchEnd : undefined}
      onMouseDown={!isBackground ? onMouseDown : undefined}
      onMouseMove={!isBackground ? onMouseMove : undefined}
      onMouseUp={!isBackground ? onMouseUp : undefined}
      onMouseLeave={!isBackground ? onMouseUp : undefined}
      aria-label={`Project: ${project.name}`}
    >
      <div className="text-portfolio-black">
        <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
        
        {project.date && (
          <p className="text-sm mb-4 text-portfolio-black/60">
            {project.date}
          </p>
        )}
        
        <p className="text-base leading-relaxed text-portfolio-black/90 mb-6">
          {project.shortDescription}
        </p>

        {/* Technology icons */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech) => (
              <img
                key={tech}
                src={getIconPath(tech)}
                alt={`${tech} icon`}
                className="w-8 h-8 object-contain"
                onError={(e) => handleIconError(e, tech)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
