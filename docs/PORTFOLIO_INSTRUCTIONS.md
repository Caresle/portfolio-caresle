# Portfolio instructions

This document should be used for the general guidelines, considerations, versioning
of the features and specifications of the projects.

## 1 Requirements

### 1.0 Tech stack

Please check the `package.json` file to see the details of which version are being used
for the project.

Here is the list of the most important dependencies of the project.

- Astro
- Tailwindcss

### 1.1 General information

Minimalist portfolio (see the [Color palette](#12-color-palette) to check more information), the goal is to show in the fastest way possible the
skills and projects.

The Current sections are the next:

- Experience
- Skills
- Projects
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

### 1.5 Content

The content of each section, right now just create a purple container for place the rest of the information later on.
