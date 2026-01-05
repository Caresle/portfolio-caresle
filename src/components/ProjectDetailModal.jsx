import { useEffect } from 'react'

function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    // Handle ESC key to close modal
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Check if technology icon exists
  const getIconPath = (tech) => {
    // Try both naming patterns
    const patterns = [
      `/skills/${tech}-icon.svg`,
      `/skills/${tech}.svg`
    ]
    // For now, we'll return the first pattern and handle errors in the img onError
    return patterns[0]
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-portfolio-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-portfolio-gray hover:bg-portfolio-black hover:text-portfolio-white transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-8">
          {/* Project name */}
          <h2 id="modal-title" className="text-3xl font-bold text-portfolio-black mb-4 pr-8">
            {project.name}
          </h2>

          {/* Date */}
          {project.date && (
            <p className="text-sm text-portfolio-black/60 mb-6">
              {project.date}
            </p>
          )}

          {/* Full description */}
          <p className="text-base leading-relaxed text-portfolio-black/90 mb-8">
            {project.fullDescription}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-portfolio-black mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-6">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex flex-col items-center">
                    <img
                      src={getIconPath(tech)}
                      alt={`${tech} icon`}
                      className="w-12 h-12 object-contain"
                      onError={(e) => handleIconError(e, tech)}
                    />
                    <span className="text-xs text-portfolio-black/70 mt-2 capitalize">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-portfolio-black text-portfolio-white rounded-lg hover:bg-portfolio-black/80 transition-colors duration-200 font-medium"
              >
                View on GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-portfolio-gray text-portfolio-black rounded-lg hover:bg-portfolio-gray/80 transition-colors duration-200 font-medium"
              >
                Live Demo
              </a>
            )}
            {project.links.youtube && (
              <a
                href={project.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-portfolio-gray text-portfolio-black rounded-lg hover:bg-portfolio-gray/80 transition-colors duration-200 font-medium"
              >
                Watch on YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailModal
