import { useState, useEffect } from 'react'

function ExperienceCard({ experience, onSwipeLeft, onSwipeRight, direction, canSwipeLeft, canSwipeRight }) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [animate, setAnimate] = useState(false)

  const minSwipeDistance = 50
  const maxDragDistance = 150

  useEffect(() => {
    if (direction !== 0) {
      setAnimate(true)
      const timer = setTimeout(() => {
        setAnimate(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [direction])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
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
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance && canSwipeLeft
    const isRightSwipe = distance < -minSwipeDistance && canSwipeRight
    
    if (isLeftSwipe) {
      onSwipeLeft()
    } else if (isRightSwipe) {
      onSwipeRight()
    }
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
    setTouchEnd(null)
  }

  const onMouseDown = (e) => {
    setTouchEnd(null)
    setTouchStart(e.clientX)
    setIsDragging(true)
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
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance && canSwipeLeft
    const isRightSwipe = distance < -minSwipeDistance && canSwipeRight
    
    if (isLeftSwipe) {
      onSwipeLeft()
    } else if (isRightSwipe) {
      onSwipeRight()
    }
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div
      className={`
        bg-portfolio-white dark:bg-portfolio-white 
        rounded-2xl p-8 shadow-lg
        cursor-grab active:cursor-grabbing
        select-none
        transition-transform duration-300
        ${animate ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
      `}
      style={{
        transform: isDragging ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)` : 'none',
        transition: isDragging ? 'none' : 'transform 0.3s ease'
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="text-portfolio-black">
        <h2 className="text-3xl font-bold mb-2">{experience.company}</h2>
        <h3 className="text-xl font-semibold mb-4 text-portfolio-black/80">
          {experience.position}
        </h3>
        <p className="text-sm mb-4 text-portfolio-black/60">
          {experience.startDate} - {experience.endDate}
        </p>
        <p className="text-base leading-relaxed text-portfolio-black/90">
          {experience.description}
        </p>
      </div>
    </div>
  )
}

export default ExperienceCard
