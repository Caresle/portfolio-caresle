import { skills } from '../constants/skills'

function SkillsSection() {
  const getIconPath = (icon) => {
    return `/skills/${icon}-icon.svg`
  }

  const handleIconError = (e, skill) => {
    // Try alternative pattern
    const altPath = `/skills/${skill.icon}.svg`
    if (e.target.src !== window.location.origin + altPath) {
      e.target.src = altPath
    } else {
      // Both patterns failed, hide the icon
      e.target.style.display = 'none'
      console.warn(`Icon not found for skill: ${skill.name}`)
    }
  }

  return (
    <div className="h-full flex items-center justify-center p-8 overflow-hidden">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-portfolio-black dark:text-portfolio-white">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col items-center justify-center gap-3 group"
            >
              <div className="w-16 h-16 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <img
                  src={getIconPath(skill.icon)}
                  alt={`${skill.name} icon`}
                  className="w-full h-full object-contain"
                  onError={(e) => handleIconError(e, skill)}
                />
              </div>
              <span className="text-sm text-center font-medium text-portfolio-black dark:text-portfolio-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
