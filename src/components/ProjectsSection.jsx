import { useState } from 'react'
import { projects } from '../constants/projects'
import ProjectCard from './ProjectCard'
import ProjectDetailModal from './ProjectDetailModal'

function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSwipe = (dir) => {
    if (dir === 'left' && currentIndex < projects.length - 1) {
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
    if (e.key === 'Enter' && !isModalOpen) {
      handleCardClick(projects[currentIndex])
    }
  }

  const handleCardClick = (project) => {
    if (!project.isSpecialCard) {
      setSelectedProject(project)
      setIsModalOpen(true)
    }
    // Special cards handle their own link opening in ProjectCard
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : null
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null

  return (
    <>
      <div 
        className="h-full flex items-center justify-center p-8 overflow-hidden"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full max-w-2xl">
          {/* Background card - Previous (shows when swiping right) */}
          {prevIndex !== null && dragOffset > 0 && (
            <div className="absolute inset-0 opacity-50 pointer-events-none">
              <ProjectCard 
                project={projects[prevIndex]}
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
              <ProjectCard 
                project={projects[nextIndex]}
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
            <ProjectCard 
              project={projects[currentIndex]}
              onSwipeLeft={() => handleSwipe('left')}
              onSwipeRight={() => handleSwipe('right')}
              direction={direction}
              canSwipeLeft={currentIndex < projects.length - 1}
              canSwipeRight={currentIndex > 0}
              onDragOffsetChange={setDragOffset}
              onClick={handleCardClick}
            />
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-portfolio-black dark:bg-portfolio-white w-8' 
                    : 'bg-portfolio-gray'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <ProjectDetailModal 
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default ProjectsSection
