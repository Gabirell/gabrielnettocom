# Project Blueprint: Personal Portfolio & Admin Hub

## Overview

This document outlines the plan for creating a personal portfolio website with a unique "2000s hacker" terminal aesthetic. The site will serve as a showcase for projects and a private hub for accessing other web applications and tools, including an admin section.

## Core Features

*   **Hacker Terminal UI:** A retro, terminal-like interface will be the central theme of the website.
*   **Project Showcase:** A dedicated section to display and link to various projects.
*   **Admin Access:** A password-protected area for administrative tasks and access to private tools.
*   **Responsive Design:** The site will be accessible and usable across different devices.
*   **Easy Navigation:** Despite the terminal look, navigation will be intuitive and user-friendly.

## Tech Stack

*   **Frontend:** React (with Vite)
*   **Routing:** `react-router-dom`
*   **Styling:** `styled-components` for custom theming and to achieve the hacker aesthetic.
*   **Terminal UI:** A React library like `react-terminal-ui` to create the interactive terminal interface.

## Development Plan

### Phase 1: Foundation and Terminal UI

1.  **Initialize Project:** Start with the existing React project setup.
2.  **Install Dependencies:** Add `react-router-dom`, `styled-components`, and a terminal UI library.
3.  **Create `blueprint.md`:** Establish this document as the single source of truth for the project plan.
4.  **Basic Structure:** Set up the main application structure with folders for components, pages, and styles.
5.  **Implement Terminal Layout:** Create a main layout component that renders the terminal interface.

### Phase 2: Navigation and Pages

1.  **Set up Routing:** Configure `react-router-dom` to handle navigation between different "commands" or pages.
2.  **Create Pages:**
    *   **Home/Welcome:** The initial view when a user visits the site.
    *   **Projects:** A page to list and describe your projects.
    *   **About:** A page with information about you.
    *   **Admin:** The login page for the admin section.
3.  **Navigation Commands:** Implement commands within the terminal to navigate to these pages (e.g., `show projects`, `about-me`).

### Phase 3: Styling and Aesthetics

1.  **Global Styles:** Create a global style sheet with `styled-components` to define the color palette, fonts (monospace), and overall retro feel.
2.  **Component Styling:** Style individual components to match the hacker theme.
3.  **Animations and Effects:** Add subtle animations or text effects to enhance the terminal experience.

### Phase 4: Admin Section and Functionality

1.  **Admin Login:** Create a simple password-protected route for the admin section.
2.  **Admin Dashboard:** Design a basic dashboard for the admin area.
3.  **Project Integration:** Add functionality to the dashboard to link to your Oracle Cloud and Google Colab projects.

### Phase 5: Content and Deployment

1.  **Add Content:** Populate the site with your project details, descriptions, and links.
2.  **Testing:** Test the site for usability, responsiveness, and bugs.
3.  **Deployment:** Prepare the site for deployment.
