# AGENTS.MD - Developer Guide for AI Coding Agents

## Project Overview
Minimalist portfolio website built with React 18 + Vite + Tailwind CSS. Features dark/light theme, swipe card interfaces for Experience/Projects sections, and a data-driven architecture using build-time JSON-to-JS transformation.

## Build, Lint, and Test Commands

### Development
```bash
npm run dev              # Start dev server (auto-runs build:projects first)
npm run preview          # Preview production build
npm run build:projects   # Generate constants from JSON data
```

### Production
```bash
npm run build            # Production build (auto-runs build:projects first)
```

### Testing
❌ No test framework configured. To run a single test: N/A

### Linting & Formatting
❌ No ESLint or Prettier configured. Follow code patterns from existing files.

## Code Style Guidelines

### File Organization
```
src/
├── components/          # React components (PascalCase.jsx)
├── constants/          # Auto-generated frozen constants (DO NOT EDIT)
├── data/               # Source JSON files (edit these!)
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles + Tailwind
```

### Component Style

**Naming Conventions:**
- Components: `PascalCase.jsx` (e.g., `ProjectCard.jsx`)
- Functions/variables: `camelCase`
- Constants: `camelCase` exported as named exports
- CSS classes: Tailwind utility classes only

**Component Structure:**
```javascript
import { useState, useEffect } from 'react'

function ComponentName({ prop1, prop2 }) {
  // 1. State declarations
  const [state, setState] = useState(initialValue)
  
  // 2. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies])
  
  // 3. Event handlers
  const handleEvent = () => {
    // handler logic
  }
  
  // 4. Helper functions
  const helperFunction = () => {
    // helper logic
  }
  
  // 5. Return JSX
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

### Import Order
1. React imports (`useState`, `useEffect`)
2. Component imports (alphabetical)
3. Data/constant imports
4. Asset imports (if any)

**Example:**
```javascript
import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../constants/projects'
```

### Styling Guidelines

**Tailwind CSS Only:**
- ✅ Use Tailwind utility classes exclusively
- ❌ No inline styles except for dynamic transforms/animations
- ✅ Use custom color palette: `portfolio-white`, `portfolio-gray`, `portfolio-black`
- ✅ Dark mode: Use `dark:` prefix (e.g., `dark:bg-portfolio-black`)

**Color Palette:**
```javascript
// In Tailwind config - use these values consistently
'portfolio-white': '#ececec'  // Light mode bg, dark mode text
'portfolio-gray': '#d4d2d5'   // Accents, borders
'portfolio-black': '#2b2b2b'  // Dark mode bg, light mode text
```

**Common Patterns:**
```javascript
// Card styling
className="bg-portfolio-white dark:bg-portfolio-white rounded-2xl p-8 shadow-lg"

// Text styling
className="text-portfolio-black dark:text-portfolio-white"

// Transitions
className="transition-colors duration-300"
```

### State Management
- ✅ Local state with `useState` for component-specific state
- ✅ Props for parent-child communication
- ❌ No external state management (Redux, Zustand, etc.)
- ✅ localStorage for theme persistence only

### Type Safety
- ❌ No TypeScript - use JSDoc comments for complex functions
- ✅ PropTypes NOT used - rely on clear naming and documentation

### Error Handling

**Image Loading:**
```javascript
const handleIconError = (e, tech) => {
  const altPath = `/skills/${tech}.svg`
  if (e.target.src !== window.location.origin + altPath) {
    e.target.src = altPath  // Try alternative pattern
  } else {
    e.target.style.display = 'none'  // Hide if both fail
  }
}
```

**General Pattern:**
- Graceful degradation (e.g., hide missing icons)
- No error boundaries configured
- Console errors acceptable for development

## Critical Patterns

### Build Script Pattern (DO NOT BREAK)

**Source of Truth:** JSON files in `src/data/`
**Generated Files:** Constants in `src/constants/` (auto-generated, DO NOT EDIT)

**Workflow:**
1. Edit `src/data/projects.json` (or other JSON files)
2. Run `npm run build:projects` (or starts automatically with dev/build)
3. Script generates `src/constants/projects.js` with `Object.freeze()`
4. Import from constants in components

**Build Script Template:**
```javascript
// scripts/build-{feature}.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sourceJsonPath = path.join(__dirname, '../src/data/{feature}.json')
const outputPath = path.join(__dirname, '../src/constants/{feature}.js')

try {
  const data = JSON.parse(fs.readFileSync(sourceJsonPath, 'utf-8'))
  const fileContent = `// Auto-generated - edit src/data/{feature}.json instead
export const {featureName} = Object.freeze(${JSON.stringify(data.{featureName}, null, 2)})`
  fs.writeFileSync(outputPath, fileContent, 'utf-8')
  console.log('✅ {Feature} constant generated')
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
```

### Swipe Card Interaction Pattern

**Constants:**
```javascript
const minSwipeDistance = 50       // Min pixels for swipe
const maxDragDistance = 150       // Max drag distance
const clickDragThreshold = 5      // Max pixels for click detection
const clickTimeThreshold = 200    // Max ms for click detection
```

**Click vs Swipe Detection:**
```javascript
const dragDistance = Math.abs(endX - startX)
const duration = Date.now() - startTime

if (dragDistance < 5 && duration < 200) {
  handleClick()  // It's a click
} else {
  handleSwipe()  // It's a swipe
}
```

### Theme Management

**App.jsx pattern:**
```javascript
const [theme, setTheme] = useState('dark')

useEffect(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  setTheme(savedTheme)
  document.documentElement.classList.toggle('dark', savedTheme === 'dark')
}, [])

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
  localStorage.setItem('theme', newTheme)
  document.documentElement.classList.toggle('dark', newTheme === 'dark')
}
```

## Common Tasks

### Adding a New Project
1. Edit `src/data/projects.json` (NOT the constants file)
2. Run `npm run build:projects` or restart dev server
3. Changes automatically reflected

### Adding Technology Icons
1. Add SVG to `/public/skills/` with pattern: `{tech}-icon.svg` or `{tech}.svg`
2. Reference in JSON as lowercase string (e.g., `"react"`, `"nodejs"`)
3. Missing icons are silently hidden (no errors)

### Creating New Components
1. Create `.jsx` file in `src/components/` with PascalCase name
2. Follow component structure template above
3. Use Tailwind for all styling
4. Export as default export
5. Import and use in parent components

### Adding New Sections
1. Create section component (e.g., `SkillsSection.jsx`)
2. Import in `AppContent.jsx`
3. Add case to switch statement
4. Update sidebar if needed

## Important Notes

- **Data Editing:** NEVER edit files in `src/constants/` - edit `src/data/*.json` instead
- **Styling:** ONLY use Tailwind classes - no CSS modules, styled-components, etc.
- **Dark Mode:** Always include `dark:` variants for theme support
- **Animations:** Use Tailwind transitions or CSS keyframes in `index.css`
- **Icons:** SVG files in `/public/skills/` - gracefully handle missing icons
- **Navigation:** Sidebar controls `activeSection` state in App.jsx
- **Modal Focus:** Use ESC key, backdrop click, and close button for all modals

## Documentation References

- `docs/PORTFOLIO_INSTRUCTIONS.md` - Full feature specifications
- `docs/BUILD_PROCESS.md` - Build script pattern documentation
- `docs/missing_icons_in_public.md` - Tracks missing technology icons
