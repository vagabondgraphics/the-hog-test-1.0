# The Hog - GTM Command Center Dashboard

A competitive intelligence dashboard for GTM teams built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

The development server is already running at:
**http://localhost:3000**

## 📋 What's Been Built

### ✅ Complete Implementation

1. **Design System**
   - Akkurat font integration (Regular, Bold, Italic, Bold Italic)
   - Custom color palette (Primary #1B5066, Success, Warning, Danger)
   - Typography scale (Display, H1, H2, Body, Caption)
   - Spacing system (8px grid)
   - Shadow and border radius tokens

2. **Core Components**
   - `Button` - Primary, Secondary, Tertiary variants with 3 sizes
   - `Card` - Reusable card container with hover states
   - `MetricCard` - Displays metrics with trends (up/down/neutral)
   - `Badge` - Color-coded labels (Success, Warning, Danger, Info)

3. **Layout Components**
   - `Header` - Top navigation with logo, search, notifications
   - `Sidebar` - Left navigation with Quick Actions and menu items
   - `OpportunityCard` - Featured opportunity with score, ICP fit, actions
   - `ActivityFeed` - Real-time activity stream (7 items)
   - `OpportunityList` - Additional opportunities from Reddit threads

4. **Dashboard Screen**
   - 3 metric cards (Opportunities Found, Competitive Moves, Active Campaigns)
   - Top opportunity spotlight with 9.2/10 score
   - Activity feed showing team actions
   - List of additional opportunities
   - Fully responsive layout

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Tailwind + Akkurat fonts
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── MetricCard.tsx
│   ├── Badge.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── OpportunityCard.tsx
│   ├── ActivityFeed.tsx
│   └── OpportunityList.tsx
├── public/
│   └── fonts/               # Akkurat font files (placeholders)
└── tailwind.config.ts       # Design system tokens
```

## 🎨 Design System

### Colors
- **Primary**: #1B5066 (Deep Teal) - CTAs and active states only
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Neutral**: #6B7280 (Gray)

### Typography
- **Display**: 32px, Bold - Page titles
- **H1**: 24px, Bold - Section headers
- **H2**: 20px, Bold - Subsection headers
- **Body**: 16px, Regular - Standard text
- **Body Small**: 14px, Regular - Labels
- **Caption**: 12px, Bold - Timestamps, tags

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

## 📝 Key Features Implemented

1. **Metric Cards** - Show KPIs with trend indicators (↗ up, ↘ down, → neutral)
2. **Opportunity Scoring** - 9.2/10 score with ICP fit percentage
3. **Activity Feed** - Real-time updates from team and AI agents
4. **Quick Actions** - Search functionality (⌘K) in sidebar
5. **Notifications** - Red dot indicator on bell icon
6. **Responsive Design** - Works on desktop, tablet, and mobile

## 🔧 Commands

```bash
npm run dev      # Start development server (already running)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## ⚠️ Important Notes

### Font Files
The Akkurat font files are currently **placeholders**. To use the actual fonts:

1. Obtain the Akkurat font files (.ttf format):
   - akkurat-regular.ttf
   - akkurat-bold.ttf
   - akkurat-italic.ttf
   - akkurat-bold-italic.ttf

2. Replace the placeholder files in `public/fonts/`

3. The CSS is already configured in `app/globals.css`

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- Font fallback: system fonts (San Francisco, Segoe UI)

## 🎯 What's Next

To complete the full vision from your documentation:

1. **Additional Screens**
   - Competitors Feed (Screen 2)
   - Channels Overview (Screen 3)
   - Content Generator (Screen 4)
   - Execution Board (Screen 5)

2. **Enhanced Features**
   - Dark mode implementation
   - Real API integration
   - Interactive charts
   - Drag-and-drop for Kanban board
   - User authentication

3. **Polish**
   - Add actual Akkurat fonts
   - Implement search functionality
   - Add animations and transitions
   - Mobile navigation improvements

## 📸 Screenshot Match

The current implementation closely matches your provided screenshot:
- ✅ Header with logo, search, notification bell
- ✅ Sidebar with checkboxes and active state
- ✅ Three metric cards at top
- ✅ Large opportunity card with badges and score
- ✅ Activity feed on the right
- ✅ Additional opportunities list
- ✅ Correct color scheme and typography

---

Built with Next.js 15, React 18, TypeScript, and Tailwind CSS
