# Site Structure & Navigation

## Purpose
Define the complete structure of gabrielnetto.com portfolio site with DOS-like terminal aesthetic, navigation system, and content organization for each major section.

---

## Site Architecture

### Main Sections
The site organizes into 6 primary sections accessible via terminal-style navigation:

1. **HOME** - Overview and highlights
2. **APPS** - Application portfolio
3. **GAMES** - Educational games showcase
4. **ARTS** - Artistic works gallery
5. **ABOUT** - Interactive timeline and bio
6. **BLOG** - Publications and Updates

---

## Navigation System

### Visual Design (DOS Terminal Aesthetic)
- **Style**: 1980s/90s DOS-like terminal interface
- **Colors**: Green phosphor on black background (#00FF00 on #000000)
- **Font**: Monospace (VT323 or similar CRT font)
- **Effects**: CRT scan lines, slight glow, chromatic aberration

### Terminal Window Controls
Following classic DOS/BIOS aesthetic (see reference images):

- **🔴 Red Button/Indicator**: Close/Exit functionality
- **🟡 Yellow Button/Indicator**: Minimize or status indicator
- **🟢 Green Button/Indicator**: Maximize or active status

### Navigation Methods

**Mouse Navigation**:
- Clickable buttons in header/menu bar
- Interactive elements with hover states
- Terminal commands clickable

**Keyboard Navigation**:
- Tab through menu items
- Arrow keys for navigation
- Enter to activate
- Keyboard shortcuts:
  - `Ctrl+H` or `Home` → HOME
  - `Ctrl+A` → APPS
  - `Ctrl+G` → GAMES  
  - `Ctrl+R` → ARTS
  - `Ctrl+I` → ABOUT
  - `Ctrl+B` → BLOG

**Terminal Commands** (typed in terminal window):
- `home` → Navigate to HOME
- `apps` → Navigate to APPS  
- `games` → Navigate to GAMES
- `arts` → Navigate to ARTS
- `about` → Navigate to ABOUT
- `blog` → Navigate to BLOG
- `help` → Show all commands
- `clear` → Clear terminal screen

---

## Section Details

### 1. HOME

**Purpose**: Welcome visitors and showcase highlights

**Content**:
- Short site explanation (2-3 sentences)
- Multilingual welcome: "G:/◾ Bem-vindo / Welcome / Bienvenid@ to GABRIEL NETTO'S website."
- Dynamic "most striking info" section
- Terminal prompt ready for interaction

**Dynamic Highlights System**:
- Track user clicks/interactions across site
- Display most popular/interesting content
- Algorithm: Weight by recency, clicks, category diversity
- Refresh weekly or on significant events

**Terminal Interface**:
- Boot sequence on first load
- System information display (DATE, VERSION, USER)
- Welcome message
- Command prompt: `$`

**Implementation Notes**:
- Current: Basic home page exists (see `src/pages/Home.tsx`)
- Enhance: Add click tracking, dynamic content selection
- Keep fake loading animation for now (real version planned for future)

---

### 2. APPS

**Purpose**: Showcase development work and applications

**Content Sources**:
- Firebase-hosted applications
- GitHub repositories  
- External hosted projects

**Features**:
- **Categorization**: Labels/tags for organization
  - By Technology: React, Python, Firebase, n8n, etc.
  - By Purpose: Education, Automation, Tools, Web, etc.
  - By Language: JavaScript/TypeScript, Python, etc.
  - By Status: Active, Archived, In Development
- **Filtering Options**:
  - Sort by: Date (newest/oldest), Name, Category, Language
  - Filter by: Technology stack, Purpose, Status
  - Search: Text search across names and descriptions
- **Display**: Card grid or terminal-style list
- **Each App Shows**:
  - Name and version
  - Short description (1-2 lines)
  - Technologies used (icons/badges)
  - Links: Live demo, GitHub repo, Documentation
  - SEO metadata (auto-generated from repo)

**Data Source**:
- Pull from GitHub API (public repos for user "Gabirell")
- Supplement with manual Firebase app listings
- Cache locally to reduce API calls
- See: `directives/content/app_sourcing.md` (TBD)

**Current State**:
- Placeholder exists: `src/App.tsx` routes to `Placeholder title="Applications"`
- Needs: Full page implementation with filtering

---

### 3. GAMES

**Purpose**: Interactive showcase of educational games

**Primary Feature**: **Space Invaders Navigation**
- Visual game selector using Space Invaders mechanics
- Shoot at game "invaders" to select/launch them
- Keyboard or mouse/touch controls
- Retro arcade aesthetic fits DOS theme

**Content**:
- Educational games (math, language, history)
- Interactive demos
- Download/play links
- Cross-platform availability info (web, Android, iOS - future)

**Game Listings Include**:
- Title and screenshot/gif
- Subject area (Math, English, Spanish, History, etc.)
- Age/grade level recommendations
- Play link (web version) or download
- Stats tracking integration (see Educational Game Series directive)

**Special Features**:
- **Stats Dashboard**: Show learning progress (future)
- **Leaderboards**: Friendly competition (future)
- **Parent/Teacher Portal**: Track student progress (future)

**Implementation Ideas**:
- Use HTML5 Canvas or WebGL for Space Invaders UI
- Game library: Phaser.js or similar
- Responsive controls (touch + keyboard + gamepad)

**Current State**:
- Placeholder exists
- Needs: Full implementation including Space Invaders selector

---

### 4. ARTS

**Purpose**: Gallery of artistic works

**Data Source**: Google Docs master document (art portfolio list)
- See: `directives/content/google_docs_integration.md`

**Content Types**:
- Visual art (paintings, digital art, 3D models)
- Photography
- Design work
- Creative projects

**Display**:
- Grid gallery layout with DOS aesthetic
- Modal/expanded view for details
- Categories/tags for filtering
- SEO-rich descriptions fetched from internet sources

**Features**:
- Fetch from Google Docs via API
- Supplement with web-scraped context (Wikipedia, art databases, etc.)
- Image optimization for web
- Lazy loading for performance

**Current State**:
- Placeholder exists
- Needs: Google Docs integration + gallery UI

---

### 5. ABOUT

**Purpose**: Interactive timeline of complete work history

**Primary Feature**: **Interactive Timeline**
- Chronological display of all projects, jobs, education, art
- Filterable by category (work, education, projects, art, etc.)
- Clickable events expand for details
- Visual timeline with DOS CRT aesthetic

**Data Source**: Google Docs master document (comprehensive bio)
- Includes everything from ARTS section + more
- Work history, education, certifications
- Major life events (relevant to professional identity)

**Display Elements**:
- Timeline axis (vertical or horizontal)
- Event markers with dates
- Category indicators (color-coded)
- Expandable detail cards
- Links to related work (apps, games, art pieces)

**Bio Section**:
- Short bio (see `directives/identity/bio.md`)
- Contact information
- Social media links (LinkedIn, GitHub, etc.)
- Resume/CV download option

**Current State**:
- Basic About page exists (`src/pages/About.tsx`)  
- Needs: Timeline implementation + Google Docs integration

---

### 6. BLOG

**Purpose**: Publication platform with social media integration

**Content Types**:
- Articles/essays
- Project updates
- Tutorials
- Video embeds (YouTube)
- Personal reflections

**Key Feature**: **Auto-posting to Social Media**
- Publish once on blog
- Auto-distribute to:
  - LinkedIn (article format)
  - Instagram (image + caption)
  - TikTok (video + description)
  - YouTube (video + description)
- Powered by n8n workflows (see `directives/n8n/social_media_automation.md` - TBD)

**Content Management**:
- Markdown-based posts (easy editing)
- Frontmatter metadata (title, date, tags, social settings)
- Draft/published states
- Scheduled publishing

**Display**:
- Reverse chronological list (newest first)
- Category/tag filtering
- Search functionality
- RSS feed generation

**Implementation Options**:
- **Static**: Pre-built posts from markdown files (simple, fast)
- **CMS**: Headless CMS integration (Strapi, Ghost, Contentful)
- **Hybrid**: Markdown files + API for dynamic features

**Current State**:
- Not yet implemented
- Critical dependency: n8n social media workflows

---

## Responsive Design

### Breakpoints
- **Desktop** (1024px+): Full terminal layout, multi-column
- **Tablet** (768px-1023px): Adjusted terminal, single-column sections
- **Mobile** (< 768px): Compact terminal, touch-friendly navigation

### Mobile Considerations
- Virtual keyboard support
- Touch-friendly terminal
- Swipe navigation option
- Simplified CRT effects (performance)

---

## SEO & Metadata

### Each Section Needs
- Unique `<title>` tag (see `directives/identity/bio.md`)
- Meta description (concise, keyword-rich)
- Open Graph tags (social media previews)
- Canonical URLs
- Structured data (Schema.org)

### URL Structure
```
https://gabrielnetto.com/              → HOME
https://gabrielnetto.com/apps          → APPS
https://gabrielnetto.com/games         → GAMES
https://gabrielnetto.com/arts          → ARTS
https://gabrielnetto.com/about         → ABOUT  
https://gabrielnetto.com/blog          → BLOG
https://gabrielnetto.com/blog/[slug]   → Individual post
```

---

## Accessibility

### WCAG 2.1 AA Compliance
- Keyboard navigation (all interactive elements)
- Screen reader support (ARIA labels)
- Sufficient color contrast (green on black is marginal - test)
- Focus indicators visible
- Skip navigation links
- Alt text for all images

### Terminal Accessibility
- Provide alternative text-only fallback
- Ensure commands work without mouse
- Voice control considerations (future)

---

## Current Implementation Status

### ✅ Completed
- Basic site structure with React Router
- CRT container and boot sequence
- Home, About, Projects pages (basic)
- Terminal controller component
- Layout component with navigation

### 🚧 In Progress / Needs Work
- Apps section (full implementation)
- Games section (Space Invaders navigation)
- Arts section (Google Docs integration)
- About section (interactive timeline)
- Blog section (complete build + automation)

### 📋 Planned
- Real system health check (loading page)
- Click tracking for dynamic highlights
- Advanced filtering/search across sections
- Social media auto-posting integration

---

## Related Directives
- [Identity & Bio](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/identity/bio.md) - Official identity information
- [Google Docs Integration](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/content/google_docs_integration.md) - Content sourcing (TBD)
- [System Health Monitoring](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/infrastructure/health_monitoring.md) - Real loading page (TBD)
- [Social Media Automation](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/n8n/social_media_automation.md) - Blog cross-posting (TBD)
