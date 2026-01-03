import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'

function AppContent({ activeSection }) {
  const renderSection = () => {
    switch (activeSection) {
      case 'Experience':
        return <ExperienceSection />
      case 'Projects':
        return <ProjectsSection />
      case 'Skills':
        return <div className="flex items-center justify-center h-full text-portfolio-black dark:text-portfolio-white">Skills Section (Coming Soon)</div>
      case 'About':
        return <div className="flex items-center justify-center h-full text-portfolio-black dark:text-portfolio-white">About Section (Coming Soon)</div>
      default:
        return <ExperienceSection />
    }
  }

  return (
    <main className="flex-1 bg-portfolio-white dark:bg-portfolio-black transition-colors duration-300">
      {renderSection()}
    </main>
  )
}

export default AppContent
