import { useState, useRef } from 'react'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import AboutSection from './AboutSection'
import ScrollIndicator from './ScrollIndicator'
import { useScroll } from '../context/ScrollContext'
import { sections } from '../constants/sections'

function AppContent({ activeSection, setActiveSection, getNextSection, getPreviousSection }) {
  const { isModalOpen } = useScroll()
  const [transitionDirection, setTransitionDirection] = useState(null)
  const cooldownRef = useRef(0)

  const handleWheel = (e) => {
    // Check if modal is open
    if (isModalOpen) return

    // Check cooldown
    const now = Date.now()
    if (now - cooldownRef.current < 800) return

    // Check if scrolling over card area
    if (e.target.closest('[data-scroll-area="card"]')) return

    // Determine direction
    const scrollingDown = e.deltaY > 0
    const scrollingUp = e.deltaY < 0

    let nextSection = null

    if (scrollingDown) {
      nextSection = getNextSection(activeSection)
      if (nextSection) {
        setTransitionDirection('down')
        setActiveSection(nextSection)
        cooldownRef.current = now
      }
    } else if (scrollingUp) {
      nextSection = getPreviousSection(activeSection)
      if (nextSection) {
        setTransitionDirection('up')
        setActiveSection(nextSection)
        cooldownRef.current = now
      }
    }
  }

  // Determine which indicators to show
  const showDownIndicator = activeSection !== sections[sections.length - 1]
  const showUpIndicator = activeSection !== sections[0]

  // Get animation class based on transition direction
  const getAnimationClass = () => {
    if (transitionDirection === 'down') return 'animate-slideInDown'
    if (transitionDirection === 'up') return 'animate-slideInUp'
    return ''
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'Experience':
        return <ExperienceSection />
      case 'Projects':
        return <ProjectsSection />
      case 'Skills':
        return <SkillsSection />
      case 'About':
        return <AboutSection />
      default:
        return <ExperienceSection />
    }
  }

  return (
    <main 
      className="flex-1 bg-portfolio-white dark:bg-portfolio-black transition-colors duration-300 relative"
      onWheel={handleWheel}
    >
      <ScrollIndicator direction="up" visible={showUpIndicator} />
      <ScrollIndicator direction="down" visible={showDownIndicator} />
      <div key={activeSection} className={`h-full ${getAnimationClass()}`}>
        {renderSection()}
      </div>
    </main>
  )
}

export default AppContent
