import { useState } from 'react'
import ExperienceCard from './ExperienceCard'

const experiences = [
  {
    id: 1,
    company: 'Tech Company Inc.',
    position: 'Senior Software Engineer',
    startDate: 'Jan 2023',
    endDate: 'Present',
    description: 'Leading the development of scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions. Mentored junior developers and conducted code reviews.'
  },
  {
    id: 2,
    company: 'Digital Solutions Ltd.',
    position: 'Full Stack Developer',
    startDate: 'Jun 2021',
    endDate: 'Dec 2022',
    description: 'Developed and maintained multiple client-facing applications. Implemented RESTful APIs and integrated third-party services. Optimized application performance and improved user experience.'
  },
  {
    id: 3,
    company: 'StartUp Ventures',
    position: 'Frontend Developer',
    startDate: 'Mar 2020',
    endDate: 'May 2021',
    description: 'Built responsive and interactive user interfaces using modern JavaScript frameworks. Worked closely with designers to implement pixel-perfect designs. Participated in agile development processes.'
  }
]

function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const handleSwipe = (dir) => {
    if (dir === 'left' && currentIndex < experiences.length - 1) {
      setDirection(-1)
      setCurrentIndex(prev => prev + 1)
    } else if (dir === 'right' && currentIndex > 0) {
      setDirection(1)
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handleSwipe('left')
    if (e.key === 'ArrowRight') handleSwipe('right')
  }

  const nextIndex = currentIndex < experiences.length - 1 ? currentIndex + 1 : null
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null

  return (
    <div 
      className="h-full flex items-center justify-center p-8 overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="relative w-full max-w-2xl">
        {/* Background card - Previous (shows when swiping right) */}
        {prevIndex !== null && dragOffset > 0 && (
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <ExperienceCard 
              experience={experiences[prevIndex]}
              onSwipeLeft={() => {}}
              onSwipeRight={() => {}}
              direction={0}
              canSwipeLeft={false}
              canSwipeRight={false}
              isBackground={true}
            />
          </div>
        )}
        
        {/* Background card - Next (shows when swiping left) */}
        {nextIndex !== null && dragOffset < 0 && (
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <ExperienceCard 
              experience={experiences[nextIndex]}
              onSwipeLeft={() => {}}
              onSwipeRight={() => {}}
              direction={0}
              canSwipeLeft={false}
              canSwipeRight={false}
              isBackground={true}
            />
          </div>
        )}

        {/* Current card */}
        <div className="relative z-10">
          <ExperienceCard 
            experience={experiences[currentIndex]}
            onSwipeLeft={() => handleSwipe('left')}
            onSwipeRight={() => handleSwipe('right')}
            direction={direction}
            canSwipeLeft={currentIndex < experiences.length - 1}
            canSwipeRight={currentIndex > 0}
            onDragOffsetChange={setDragOffset}
          />
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-portfolio-black dark:bg-portfolio-white w-8' 
                  : 'bg-portfolio-gray'
              }`}
              aria-label={`Go to experience ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceSection
