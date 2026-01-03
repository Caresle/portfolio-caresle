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
