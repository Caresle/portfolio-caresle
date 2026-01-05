# Portfolio instructions

This document should be used for the general guidelines, considerations, versioning
of the features and specifications of the projects.

## 1 Requirements

### 1.0 Tech stack

Please check the `package.json` file to see the details of which version are being used
for the project.

Here is the list of the most important dependencies of the project.

- Reactjs
- Tailwindcss

### 1.1 General information

Minimalist portfolio (see the [Color palette](#12-color-palette) to check more information), the goal is to show in the fastest way possible the
skills and projects.

The Current sections are the next:

- Experience
- Projects
- Skills
- About

### 1.2 Color Palette

The list of color that the application must stick with.

White - #ececec
Gray - #d4d2d5
Black - #2b2b2b

### 1.3 General look of the web page

Let's begin with how the web page of the portfolio should look, next is the current idea of how should be look. Consider
that the page should support dark/light mode according with the given colors, in the color palette section.

```
+-------------------+
|    |              |
| A  |     B        |
|    |              |
+-------------------+
```

With this given schema where `A` is the sidebar where should be placed the sections mentioned in [General Information](#11-general-information) and `B` the content. For further references we are going to refer to these sections like follow:

- `A` -> `Sidebar`
- `B` -> `AppContent`

For Sidebar see the descriptions in the next point [Sidebar specifications](#14-sidebar) and for AppContent in the next one [Content](#15-content)

### 1.4 Sidebar

The sidebar is a vertical list of items each one of these with the section discussed on general information. For the moment
just create a red container for place the rest of the sidebar.

### 1.4.1 Sidebar ui work

Now it's important to create a nice looking ui, but at the same time still in the minimalist aspect.

For that first consider that this sidebar should be center in the Y axis (column) and that we will be working in a sidebar
that support both dark and light mode, so please remote the original color of the container with a better one.

Each item in the list of the sidebar (`SidebarItem` from now) should have a white background and dark text for the dark mode
version, with rounded corners (Maybe somethings like lg/xl). Consider ofcourse the hover and transition states

### 1.4.2 Sidebar theme switcher

Before continuing adding more features let's handle the dark and light toggle, please and a theme switcher after the last element
of the list of section in the page, consider that the user should be able to see the change in the theme.

Also adapt the previous components to reflect the change of the theme from dark and light modes, the theme switcher
to look a lot better please add icons like a sun or moon to give more feedback to the user.

### 1.5 Content

The content of each section, right now just create a purple container for place the rest of the information later on.

### 1.5.1 Removing old colors

Before continue with the new requirements, please change the color used in the background to coincide with the one
in the sidebar.

> Note: is not an error to use the white color as a background in the light version of the sidebar
> the idea is that the distintion between both of the sections (Sidebar and AppContent) can not be perciven
> in the app

### 1.5.2 Experience section

For this section we will be describing first what the idea is and then go more into the
implementation details. For those see the next points from (1.5.2.1) to (1.5.2.x)

#### 1.5.2.1 Experience section concept

The concept for this part of the portfolio is something between a caroussel and a timeline.
In the center of the page content will be displayed a card with a title that represents the
name of the last job that I have, with also the dates of my time there. The user can swipe
to see the next job in my list, think of this like the tinder or bumble apps, where you have
a swipe for match.


#### 1.5.2.2 Adding more cards

Add at least 3 cards to test the swipe integration.

#### 1.5.2.3 Swipe overflow handling

Fix the overflow issue for the swipe functionality to prevent horizontal scrolling and ensure
proper boundaries. The implementation should:

- Prevent the page from scrolling horizontally when swiping cards
- Limit the maximum drag distance to maintain visual consistency
- Provide resistance feedback when attempting to swipe beyond the first or last card
- Only allow swipes when there is a previous or next card available

#### 1.5.2.4 Opacity background card when swipe

The idea is when the user move the cards to left/right they can see the next one
but with the opacity at 50% of their original value.

**Requirements**

- See the next experience card when swipe left/right
- The card has a transparency of 50%


**Acceptance Criteria**

- [ ] A card is showed at the back of the current one being swipe left/right
- [ ] The card has an opacity of 50% in case this number conflict with accesibility can be changed for a better one

**Dependencies**:

This point to be added required the previous ones from 1.5.x.x to 1.5.2.3.x

### 1.5.3 Projects section

The Projects section showcases portfolio projects using the same swipe card interface as the Experience section. Users can view project summaries on cards and click to see detailed information in a modal.

#### 1.5.3.1 Projects section concept

**Purpose:** Display portfolio projects in an engaging, interactive format that allows users to quickly browse and explore project details.

**UX Pattern:** 
- Swipe card interface (identical to Experience section)
- 3 cards total: 2 projects + 1 special card for external links
- Click cards to view detailed modal
- Touch, mouse, and keyboard navigation support

**Data Management:**
- Projects stored in `src/data/projects.json` (editable without code changes)
- Build script transforms JSON → frozen constant in `src/constants/projects.js`
- Build process documented in `docs/BUILD_PROCESS.md`

**Requirements:**
- Load project data from generated constants file
- Support exactly 3 cards (2 projects + 1 special card)
- Swipe mechanics identical to Experience section
- Click to view details modal (regular projects)
- Click to open external links (special card)
- Display technology icons from `/public/skills/`
- Track missing icons in documentation

**Acceptance Criteria:**
- [ ] Projects load from `src/constants/projects.js` (auto-generated)
- [ ] Build script runs before dev and build commands
- [ ] Swipe left/right works with touch, mouse, and keyboard
- [ ] Click opens modal for regular projects
- [ ] Click opens external links for special card  
- [ ] Technology icons display when available
- [ ] Missing icons logged to `docs/missing_icons_in_public.md`
- [ ] Modal shows full project details
- [ ] Modal closes on ESC, backdrop click, close button
- [ ] Progress indicators show current position (3 dots)
- [ ] Background cards visible at 50% opacity during swipe
- [ ] No horizontal page scroll during swipe
- [ ] Click vs swipe detection prevents accidental modal opens

**Dependencies:**
Requires 1.5.2 (Experience section) to be completed first

---

#### 1.5.3.2 Project data structure

**Source File:** `src/data/projects.json`

**Schema:**
```json
{
  "projects": [
    {
      "id": number,                    // Unique identifier
      "name": string,                  // Project name/title
      "shortDescription": string,      // Brief summary (shown on card)
      "fullDescription": string,       // Detailed info (shown in modal)
      "technologies": string[],        // Array of tech names matching icon files
      "links": {
        "github": string?,             // GitHub repository URL (optional)
        "demo": string?,               // Live demo URL (optional)
        "youtube": string?             // YouTube video URL (optional)
      },
      "date": string,                  // Date range or year
      "isSpecialCard": boolean         // true for GitHub/YouTube redirect card
    }
  ]
}
```

**Field Descriptions:**
- `id`: Unique numeric identifier for each project
- `name`: Display name of the project
- `shortDescription`: Summary shown on the card (2-3 sentences max)
- `fullDescription`: Detailed description shown in modal (can be longer, use `null` for special card)
- `technologies`: Array of technology names that must match icon filenames in `/public/skills/`
- `links`: Object containing optional URLs (at least one recommended)
- `date`: Display string for project timeline (e.g., "2023 - 2024", "2024")
- `isSpecialCard`: Boolean flag, `true` only for the special card (position 3)

**Technology Icon Naming:**
Technology names in the array must correspond to icon files:
- Format: `{technology}-icon.svg` or `{technology}.svg`
- Example: `"react"` → looks for `react-icon.svg` or `react.svg` in `/public/skills/`
- Case-sensitive matching
- If icon not found, technology is skipped and logged to `docs/missing_icons_in_public.md`

**Special Card:**
- Always positioned as 3rd (last) card
- `isSpecialCard: true`
- `fullDescription: null` (no modal)
- Links to external profiles (GitHub, YouTube, etc.)
- Technologies array empty `[]`
- Date can be `null`

**Editing Projects:**
1. Edit `src/data/projects.json` directly
2. Run `npm run build:projects` (or happens automatically with `npm run dev`)
3. Build script regenerates `src/constants/projects.js`
4. Changes reflected in application

---

#### 1.5.3.3 Build script process

**Purpose:** Transform editable JSON data into immutable JavaScript constants for optimal runtime performance.

**Build Script:** `scripts/build-projects.js`

**Process:**
1. Read `src/data/projects.json`
2. Validate JSON structure (must have `projects` array)
3. Generate `src/constants/projects.js` with frozen export
4. Create output directory if needed
5. Write file with auto-generation warning comment
6. Report success/failure with details

**Generated File Format:**
```javascript
// This file is auto-generated by scripts/build-projects.js
// Do not edit manually - edit src/data/projects.json instead

export const projects = Object.freeze([
  { /* project data */ }
])
```

**Integration:**
- `npm run build:projects` - Run manually
- `npm run dev` - Auto-runs build:projects, then starts dev server
- `npm run build` - Auto-runs build:projects, then production build

**Error Handling:**
- Invalid JSON syntax → exit with error message
- Missing `projects` array → validation error
- File read/write errors → descriptive error message
- All errors exit with code 1 (stops build process)

**Benefits:**
- Edit-friendly: Change JSON without touching code
- Type-safe: Generated JS constants
- Fast: No runtime JSON parsing or fetch calls
- Build-time validation: Catch errors before deployment
- Immutable: `Object.freeze()` prevents accidental data changes

For detailed documentation, see `docs/BUILD_PROCESS.md`

---

#### 1.5.3.4 Component architecture

**Main Components:**

1. **ProjectsSection.jsx**
   - Main container component
   - Manages swipe state (currentIndex, direction, dragOffset)
   - Manages modal state (open/closed, selected project)
   - Imports projects from `src/constants/projects.js`
   - Handles keyboard navigation (Arrow keys)
   - Renders current card, background cards, progress indicators
   - Similar structure to ExperienceSection.jsx

2. **ProjectCard.jsx**
   - Individual project card component
   - Displays: name, short description, date, technology icons
   - Handles swipe gestures (touch and mouse)
   - Handles click detection (vs swipe detection)
   - Supports drag physics (max distance, resistance)
   - Different behavior for special card (direct link navigation)
   - Similar structure to ExperienceCard.jsx

3. **ProjectDetailModal.jsx**
   - Modal overlay for detailed project view
   - Displays: full description, all technologies, action buttons
   - Close methods: ESC key, backdrop click, close button
   - Smooth fade animations (300ms)
   - Prevents body scroll when open
   - Focus trap for accessibility
   - Only shown for regular projects (not special card)

**Component Hierarchy:**
```
ProjectsSection
├── ProjectCard (background - previous)
├── ProjectCard (current - interactive)
├── ProjectCard (background - next)
└── ProjectDetailModal (conditional)
```

**State Management:**
- Local state using React useState
- No external state management needed
- Modal state managed in ProjectsSection
- Drag state managed in ProjectCard

**Data Flow:**
1. ProjectsSection imports frozen projects array
2. Passes current project to ProjectCard
3. ProjectCard emits click event with project data
4. ProjectsSection opens modal with selected project
5. Modal receives project data as props

---

#### 1.5.3.5 Click to view details functionality

**Purpose:** Allow users to click/tap project cards to view detailed information in a modal, while distinguishing from swipe gestures.

**Click Detection Logic:**

```javascript
// Track interaction start
const startX = event.clientX // or touch position
const startTime = Date.now()

// On interaction end
const dragDistance = Math.abs(endX - startX)
const interactionDuration = Date.now() - startTime

// Determine if click or swipe
if (dragDistance < 5 && interactionDuration < 200) {
  handleClick() // Open modal or navigate
} else {
  handleSwipe() // Complete swipe gesture
}
```

**Thresholds:**
- Drag distance: < 5 pixels = click
- Duration: < 200 milliseconds = click
- Any movement beyond these = swipe (no modal opens)

**Regular Project Cards:**
- Click → Open ProjectDetailModal
- Pass full project data to modal
- Modal displays: full description, technologies, links
- Background darkens (backdrop overlay)
- Body scroll disabled

**Special Card:**
- Click → Open external links in new tabs
- If `links.github` exists → `window.open(url, '_blank')`
- If `links.youtube` exists → `window.open(url, '_blank')`
- Multiple links can open simultaneously
- No modal displayed
- Security: Use `rel="noopener noreferrer"`

**Preventing Accidental Opens:**
- Swipe gestures don't trigger modals
- Small accidental movements ignored
- Only deliberate clicks/taps open modal
- Visual feedback: cursor pointer on hover

**Requirements:**
- Click works on touch devices (tap)
- Click works with mouse
- Swipe doesn't trigger click
- Clear visual indication of clickability

**Acceptance Criteria:**
- [ ] Click/tap opens modal for regular projects
- [ ] Swipe gestures don't open modal
- [ ] Special card opens external links
- [ ] No modal for special card
- [ ] Multiple rapid clicks handled gracefully
- [ ] Visual cursor indicates clickable

---

#### 1.5.3.6 Technology icons display

**Purpose:** Visually represent technologies used in each project with recognizable icons.

**Icon Location:** `/public/skills/`

**Icon Resolution Logic:**
1. For each technology in `project.technologies` array
2. Check if icon exists: `{technology}-icon.svg` or `{technology}.svg`
3. If found → Display icon with alt text
4. If not found → Skip display AND log to `docs/missing_icons_in_public.md`

**Naming Conventions:**
- Primary pattern: `{technology}-icon.svg` (e.g., `react-icon.svg`)
- Alternative pattern: `{technology}.svg` (e.g., `nodejs.svg`)
- Case-sensitive matching
- Use lowercase technology names in JSON

**Display Specifications:**

**On Card (ProjectCard):**
- Icon size: 32px × 32px
- Horizontal row layout
- Gap between icons: 8px
- Maximum visible: 6-8 icons (depending on card width)
- Positioned near bottom of card
- No text labels on card

**In Modal (ProjectDetailModal):**
- Icon size: 48px × 48px
- Grid or row layout with wrapping
- Gap: 12px
- Include text labels below each icon
- Technology name displayed
- More prominent presentation

**Missing Icon Handling:**
```javascript
const checkIconExists = (techName) => {
  const patterns = [
    `/skills/${techName}-icon.svg`,
    `/skills/${techName}.svg`
  ]
  
  // Try to load, if fails → log and skip
  // Log format: "- {techName} (detected: YYYY-MM-DD)"
  // Append to docs/missing_icons_in_public.md
}
```

**Missing Icons File:** `docs/missing_icons_in_public.md`
- Auto-updated when icon not found
- Lists missing technology names
- Includes detection date
- Prevents duplicate entries
- Format:
  ```markdown
  ## Missing Icons
  - technology-name (detected on: 2024-01-03)
  ```

**Accessibility:**
- Alt text: `{Technology} icon`
- Meaningful fallback if images fail to load
- Technology names in modal provide text alternative

**Requirements:**
- Display available icons only
- Silent handling of missing icons (no errors)
- Log missing icons for tracking
- Consistent sizing and spacing
- Responsive layout

**Acceptance Criteria:**
- [ ] Icons load from `/public/skills/`
- [ ] Missing icons don't break layout
- [ ] Missing icons logged to markdown file
- [ ] Icon size appropriate for context (card vs modal)
- [ ] Alt text present for accessibility
- [ ] Icons display in order of technologies array

---

#### 1.5.3.7 Special card behavior

**Purpose:** Provide a call-to-action card that directs users to external profiles (GitHub, YouTube) for more projects.

**Position:** Always 3rd (last) card in the sequence

**Visual Design:**
- Uses same styling as regular project cards
- White background, dark text (matches color palette)
- Rounded 2xl corners, shadow-lg
- Same dimensions and proportions
- No visual distinction in V1 (just different content)

**Content Differences:**
- `name`: "See More Projects" (or custom message)
- `shortDescription`: Invitation to view external profiles
- No `fullDescription` (null value)
- Empty `technologies` array (no icons displayed)
- `date` can be null (no date displayed)
- `isSpecialCard: true` (flag for different behavior)

**Interaction Behavior:**
- **No modal on click** (unlike regular project cards)
- **Direct navigation to external links:**
  - If `links.github` → Open GitHub profile in new tab
  - If `links.youtube` → Open YouTube channel in new tab
  - Multiple links can open simultaneously
- **Security attributes:** `target="_blank" rel="noopener noreferrer"`
- **Same swipe behavior:** Can swipe to/from this card

**Click Handler Logic:**
```javascript
const handleCardClick = () => {
  if (project.isSpecialCard) {
    // Open all available links
    if (project.links.github) {
      window.open(project.links.github, '_blank', 'noopener,noreferrer')
    }
    if (project.links.youtube) {
      window.open(project.links.youtube, '_blank', 'noopener,noreferrer')
    }
  } else {
    // Open modal with project details
    onOpenModal(project)
  }
}
```

**User Experience:**
- Cursor shows pointer on hover (indicates clickable)
- Click opens new browser tabs
- User remains on portfolio site
- Can return to view other projects

**Example Data:**
```json
{
  "id": 3,
  "name": "See More Projects",
  "shortDescription": "Check out more of my work on GitHub and explore video content on YouTube.",
  "fullDescription": null,
  "technologies": [],
  "links": {
    "github": "https://github.com/yourusername",
    "youtube": "https://youtube.com/@yourchannel"
  },
  "date": null,
  "isSpecialCard": true
}
```

**Requirements:**
- Positioned as 3rd card
- Visually consistent with other cards
- Click opens external links (no modal)
- Supports multiple links
- Swipe behavior unchanged

**Acceptance Criteria:**
- [ ] Card appears as 3rd in sequence
- [ ] Click does not open modal
- [ ] External links open in new tabs
- [ ] Multiple links can open simultaneously
- [ ] Security attributes present on links
- [ ] Visual styling matches other cards
- [ ] Swipe to/from card works correctly

**Future Enhancements (Out of Scope):**
- Visual distinction (border, icon, accent color)
- Animated call-to-action elements
- Different card layout for special content

---

#### 1.5.3.8 Integration with AppContent

**Purpose:** Integrate ProjectsSection into the main application navigation.

**File:** `src/components/AppContent.jsx`

**Changes Required:**
1. Import ProjectsSection component
2. Replace "Coming Soon" placeholder in switch statement
3. Maintain existing routing logic

**Implementation:**
```javascript
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection' // Add this import

function AppContent({ activeSection }) {
  const renderSection = () => {
    switch (activeSection) {
      case 'Experience':
        return <ExperienceSection />
      case 'Projects':
        return <ProjectsSection /> // Replace placeholder
      case 'Skills':
        return <div>Skills Section (Coming Soon)</div>
      case 'About':
        return <div>About Section (Coming Soon)</div>
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
```

**Requirements:**
- Import ProjectsSection from correct path
- Remove "Coming Soon" placeholder
- Maintain existing component structure
- No other changes to AppContent

**Acceptance Criteria:**
- [ ] ProjectsSection renders when "Projects" selected in sidebar
- [ ] Smooth transition from other sections
- [ ] No console errors
- [ ] Theme transitions work correctly
- [ ] Component unmounts cleanly when navigating away

**Testing:**
1. Click "Projects" in sidebar
2. Verify ProjectsSection renders
3. Test swipe functionality
4. Test click to open modal
5. Navigate to other sections and back
6. Check console for errors

---

**Technical Notes:**
- Click detection threshold: drag < 5px, duration < 200ms
- Max drag distance: 150px
- Min swipe distance: 50px for navigation
- Modal animation duration: 300ms
- Background card opacity: 50%
- Technology icon size: 32px (card), 48px (modal)

**Accessibility:**
- Keyboard navigation: Arrow keys (left/right), Enter (open modal), ESC (close modal)
- ARIA labels: `aria-label="Project: {name}"` on cards
- Modal: `role="dialog"`, `aria-modal="true"`
- Focus trap in modal
- Focus returns to trigger on modal close
- Alt text on all icons

**Dependencies:**
This section requires 1.5.2 (Experience section) to be completed first as it follows the same interaction patterns and component structure.

---

### 1.6 Scroll-Based Section Navigation

**Purpose:** Enable intuitive vertical scroll navigation that transitions between sections when users scroll in empty areas, providing a seamless browsing experience with visual feedback.

#### 1.6.1 Scroll navigation concept

**Overview:**
Users can navigate between sections (Experience → Projects → Skills → About) by scrolling up or down in empty areas outside of interactive card components. This creates a natural flow similar to single-page presentation websites while maintaining the swipe card interactions within sections.

**Key Features:**
- Vertical scroll detection in empty areas only
- Smooth directional transitions (slide + fade animations)
- Visual scroll indicators (pulsing arrows)
- 800ms cooldown to prevent accidental rapid switching
- Full mobile/tablet support
- No conflicts with horizontal card swipes

**Section Order:**
```
Experience (first)
    ↓ scroll down
Projects
    ↓ scroll down
Skills
    ↓ scroll down
About (last)
```

**User Experience:**
- Scroll down in empty area → Navigate to next section
- Scroll up in empty area → Navigate to previous section
- At first section (Experience) → Scroll up does nothing
- At last section (About) → Scroll down does nothing
- Modal open → Scroll navigation disabled
- Over card areas → Scroll ignored (prevents conflicts)

#### 1.6.2 Technical architecture

**Components:**

1. **ScrollContext** (`src/context/ScrollContext.jsx`)
   - Shared context for modal state management
   - Provides `isModalOpen` and `setIsModalOpen`
   - Used to disable scroll navigation when modals are open
   - Consumed by AppContent and ProjectsSection

2. **ScrollIndicator** (`src/components/ScrollIndicator.jsx`)
   - Visual indicators showing scroll availability
   - Props: `direction` ('up' | 'down'), `visible` (boolean)
   - Displays pulsing chevron arrows
   - Position: Fixed at top (up arrow) or bottom (down arrow)
   - Auto-hides at section boundaries

3. **Section Constants** (`src/constants/sections.js`)
   - Centralized section order definition
   - Frozen array: `['Experience', 'Projects', 'Skills', 'About']`
   - Single source of truth for section navigation
   - Used by Sidebar, App, and AppContent

**State Management:**
- ScrollProvider wraps entire app in `App.jsx`
- Modal state shared via context (prevents scroll when modal open)
- Transition direction tracked in `AppContent` for animations
- Cooldown managed with useRef (avoids re-renders)

**Data Flow:**
```
User scrolls in empty area
    ↓
AppContent.handleWheel detects scroll
    ↓
Check: Modal open? → Block
Check: Cooldown active? → Block
Check: Over card area? → Block
    ↓
Determine direction (deltaY > 0 = down, < 0 = up)
    ↓
Get next/previous section from helpers
    ↓
Set transition direction state
    ↓
Call setActiveSection (triggers re-render)
    ↓
CSS animation plays (slideInDown/slideInUp)
    ↓
Activate 800ms cooldown
```

#### 1.6.3 Scroll detection implementation

**Event Listener:** `onWheel` on main content container

**Detection Logic:**
```javascript
const handleWheel = (e) => {
  // 1. Check if modal is open
  if (isModalOpen) return

  // 2. Check cooldown (800ms)
  const now = Date.now()
  if (now - cooldownRef.current < 800) return

  // 3. Check if scrolling over card area
  if (e.target.closest('[data-scroll-area="card"]')) return

  // 4. Determine direction
  const scrollingDown = e.deltaY > 0  // Positive = down
  const scrollingUp = e.deltaY < 0    // Negative = up

  // 5. Navigate to next/previous section
  if (scrollingDown) {
    const nextSection = getNextSection(activeSection)
    if (nextSection) {
      setTransitionDirection('down')
      setActiveSection(nextSection)
      cooldownRef.current = now
    }
  } else if (scrollingUp) {
    const prevSection = getPreviousSection(activeSection)
    if (prevSection) {
      setTransitionDirection('up')
      setActiveSection(prevSection)
      cooldownRef.current = now
    }
  }
}
```

**Cooldown Mechanism:**
- Duration: 800ms between section transitions
- Implementation: useRef for timestamp (no re-renders)
- Prevents accidental rapid switching
- Allows smooth, intentional navigation

**Card Area Detection:**
- Card containers marked with `data-scroll-area="card"`
- Locations: ExperienceSection and ProjectsSection card wrappers
- Scroll handler checks: `e.target.closest('[data-scroll-area="card"]')`
- If match found → Ignore scroll event
- Prevents conflicts with horizontal card swipes

#### 1.6.4 Visual indicators

**Scroll Indicators:**
- Component: `ScrollIndicator.jsx`
- Display: Pulsing chevron arrows
- Animation: `pulse-subtle` (2s infinite, scale 1 → 1.1 → 1)
- Opacity: 0.5 base, 0.7 at peak

**Up Arrow (Chevron Up):**
- Position: `fixed top-12 left-1/2` (centered)
- Visible: When NOT on first section (Experience)
- Indicates: Can scroll up to previous section

**Down Arrow (Chevron Down):**
- Position: `fixed bottom-12 left-1/2` (centered)
- Visible: When NOT on last section (About)
- Indicates: Can scroll down to next section

**Styling:**
```javascript
{
  size: '32px × 32px',
  colors: 'text-portfolio-black dark:text-portfolio-white',
  opacity: 0.5,
  animation: 'pulse-subtle 2s infinite',
  zIndex: 20,
  pointerEvents: 'none'
}
```

**Visibility Logic:**
```javascript
const showDownIndicator = activeSection !== sections[sections.length - 1]
const showUpIndicator = activeSection !== sections[0]
```

#### 1.6.5 Transition animations

**Animation Types:**

1. **Slide Down** (scrolling to next section)
   ```css
   @keyframes slideInDown {
     from {
       opacity: 0;
       transform: translateY(-20px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ```
   - Duration: 400ms
   - Easing: ease-out
   - Effect: Slides in from top with fade

2. **Slide Up** (scrolling to previous section)
   ```css
   @keyframes slideInUp {
     from {
       opacity: 0;
       transform: translateY(20px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ```
   - Duration: 400ms
   - Easing: ease-out
   - Effect: Slides in from bottom with fade

**Implementation:**
- Transition direction tracked in AppContent state
- Key attribute on section wrapper triggers re-mount
- Animation class applied based on direction
- CSS handles the actual animation

**Animation Flow:**
1. User scrolls → Direction detected
2. setTransitionDirection called ('up' or 'down')
3. setActiveSection updates current section
4. React re-renders with new key
5. CSS animation class applied
6. Section slides and fades in (400ms)

#### 1.6.6 Mobile and tablet support

**Touch Support:**
- Primary: `onWheel` event (works on most modern mobile browsers)
- Tested on: iOS Safari, Chrome Mobile, Android browsers
- Two-finger scroll and swipe gestures supported

**Responsive Behavior:**
- Indicators: Visible and properly positioned on all screen sizes
- Touch areas: No interference with card swipe gestures
- Animations: Smooth on mobile devices (hardware accelerated)

**Gesture Priority:**
- Horizontal swipes on cards → Card navigation (higher priority)
- Vertical scroll in empty areas → Section navigation
- No conflicts due to `data-scroll-area="card"` detection

**Testing Requirements:**
- [ ] Mouse wheel (desktop)
- [ ] Trackpad scroll (MacBook)
- [ ] Two-finger scroll (mobile/tablet)
- [ ] Touch swipe (mobile)
- [ ] Landscape and portrait orientations

#### 1.6.7 Edge cases and error handling

**Boundary Conditions:**
1. **At First Section (Experience)**
   - Scroll up → No action
   - Up indicator → Hidden
   - Down indicator → Visible

2. **At Last Section (About)**
   - Scroll down → No action
   - Down indicator → Hidden
   - Up indicator → Visible

3. **Modal Open**
   - All scroll navigation → Disabled
   - Indicators → Still visible (informational)
   - Context check prevents navigation

4. **Rapid Scrolling**
   - Cooldown → Prevents multiple transitions
   - First scroll → Triggers navigation
   - Additional scrolls within 800ms → Ignored

5. **Over Card Areas**
   - Scroll events → Ignored
   - Allows card interactions → Unaffected
   - Detection via `data-scroll-area` attribute

**Error Prevention:**
- Null checks on next/previous section
- Context throws error if used outside provider
- Graceful degradation if animations unsupported

#### 1.6.8 Implementation checklist

**Setup:**
- [x] Create ScrollContext for modal state sharing
- [x] Create sections constants file
- [x] Update Sidebar to use sections constants
- [x] Wrap app with ScrollProvider in App.jsx

**Navigation Logic:**
- [x] Add section navigation helpers (getNextSection, getPreviousSection)
- [x] Add scroll event handler to AppContent
- [x] Implement cooldown mechanism (800ms)
- [x] Add card area detection logic

**Visual Components:**
- [x] Create ScrollIndicator component
- [x] Add pulse animation CSS
- [x] Integrate indicators in AppContent
- [x] Calculate indicator visibility

**Animations:**
- [x] Add slideInDown CSS keyframe
- [x] Add slideInUp CSS keyframe
- [x] Track transition direction in state
- [x] Apply animation classes on section change

**Integration:**
- [x] Add data-scroll-area to ExperienceSection card container
- [x] Add data-scroll-area to ProjectsSection card container
- [x] Update ProjectsSection to use ScrollContext
- [x] Pass navigation props to AppContent

**Testing:**
- [ ] Desktop scroll navigation (mouse wheel)
- [ ] Trackpad scroll (MacBook)
- [ ] Mobile/tablet touch scroll
- [ ] Card swipes still work (no conflicts)
- [ ] Modal disables scroll navigation
- [ ] Indicators show/hide correctly
- [ ] Transitions are smooth and directional
- [ ] Cooldown prevents rapid switching
- [ ] Boundary behavior correct (first/last sections)

#### 1.6.9 Technical specifications

**Constants:**
```javascript
{
  cooldownDuration: 800,        // ms between transitions
  animationDuration: 400,       // ms for slide transitions
  pulseAnimationDuration: 2000, // ms for indicator pulse
  indicatorOpacity: 0.5,        // base opacity
  indicatorSize: 32,            // px (width and height)
  slideDistance: 20             // px for slide animation
}
```

**File Locations:**
- Context: `src/context/ScrollContext.jsx`
- Constants: `src/constants/sections.js`
- Indicator: `src/components/ScrollIndicator.jsx`
- Animations: `src/index.css`
- Integration: `src/App.jsx`, `src/components/AppContent.jsx`

**Dependencies:**
Requires sections 1.5.2 (Experience) and 1.5.3 (Projects) to be completed as they provide the card interaction patterns that must be preserved.

---

#### 1.6.10 Important implementation considerations

**Content Centering:**
All sections must be vertically and horizontally centered within the AppContent area. This is achieved through:

1. **AppContent wrapper must have height:**
   ```jsx
   <div key={activeSection} className={`h-full ${getAnimationClass()}`}>
     {renderSection()}
   </div>
   ```
   - The wrapper div needs `h-full` class to take full height
   - Without it, content appears at the top of the page

2. **Each section component must use flex centering:**
   ```jsx
   <div className="h-full flex items-center justify-center p-8 overflow-hidden">
     {/* Section content */}
   </div>
   ```
   - `h-full` - Takes full available height
   - `flex items-center justify-center` - Centers content vertically and horizontally
   - Applied to: ExperienceSection, ProjectsSection, Skills, About

**Scroll Indicator Positioning:**
Indicators must be positioned relative to the AppContent component, not the entire viewport:

1. **AppContent must be position relative:**
   ```jsx
   <main className="flex-1 bg-portfolio-white dark:bg-portfolio-black transition-colors duration-300 relative">
   ```
   - Added `relative` class to create positioning context

2. **ScrollIndicator must use absolute positioning:**
   ```jsx
   className="absolute bottom-12 left-1/2 -translate-x-1/2"
   ```
   - Changed from `fixed` to `absolute`
   - Positions relative to AppContent, not viewport
   - Ensures indicators stay within content area

3. **ScrollIndicators placed inside main element:**
   ```jsx
   <main className="...relative" onWheel={handleWheel}>
     <ScrollIndicator direction="up" visible={showUpIndicator} />
     <ScrollIndicator direction="down" visible={showDownIndicator} />
     <div className="h-full">...</div>
   </main>
   ```
   - Indicators are children of the `<main>` element
   - Not siblings of `<main>` (previous incorrect implementation)
   - Allows proper relative positioning

**Why These Fixes Matter:**
- **Content Centering:** Ensures consistent visual hierarchy across all sections
- **Indicator Positioning:** Keeps indicators within the content bounds (respects sidebar)
- **User Experience:** Creates balanced, centered layouts that feel professional
- **Responsiveness:** Works correctly at all screen sizes and with different sidebar widths

**Testing Checklist After Fixes:**
- [ ] All sections (Experience, Projects, Skills, About) are vertically centered
- [ ] Scroll indicators appear at bottom-center of content area (not entire screen)
- [ ] Indicators don't overlap with sidebar
- [ ] Content doesn't touch top of viewport
- [ ] Animations still work smoothly with centered content
- [ ] Layout is responsive on different screen sizes

