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
