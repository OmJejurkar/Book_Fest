# 🎨 Pune Book Fest 2025 Chatbot - Visual Design Guide

## Color Palette

### Primary Colors
- **Main Purple**: `#8976a5`
- **Dark Purple**: `#100223d0`
- **Light Purple**: `#c8c7ff`
- **Very Light Purple**: `#eeeeff`
- **White**: `#ffffff`

### Gradients
- **Background**: Linear gradient from `#eeeeff` to `#c8c7ff`
- **Header**: Linear gradient from `#8976a5` to `#100223d0`
- **Buttons**: Smooth purple gradients

## Typography
- **Font Family**: 'Poppins', sans-serif
- **Header Title**: 28px, Bold (700)
- **Header Subtitle**: 14px, Light (300)
- **Message Text**: 15px, Regular (400)
- **Menu Labels**: 13px, Medium (500)

## Component Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    DESKTOP LAYOUT                            │
│                                                              │
│  ┌────────────────────────────┬────────────────────────┐   │
│  │    CHAT CONTAINER          │   MENU BUTTONS         │   │
│  │  ┌──────────────────────┐  │  ┌──────────────────┐  │   │
│  │  │  HEADER              │  │  │  Quick Actions   │  │   │
│  │  │  📚 Pune Book Fest   │  │  │                  │  │   │
│  │  │  Virtual Guide       │  │  │  [🗓️ Schedule]   │  │   │
│  │  └──────────────────────┘  │  │  [📅 Day-wise]   │  │   │
│  │                            │  │  [🎥 YouTube]    │  │   │
│  │  ┌──────────────────────┐  │  │  [👍 Facebook]   │  │   │
│  │  │  CHAT WINDOW         │  │  │  [📸 Instagram]  │  │   │
│  │  │                      │  │  │  [🌐 Website]    │  │   │
│  │  │  Bot: Welcome! 📚    │  │  │  [📍 Location]   │  │   │
│  │  │                      │  │  │  [ℹ️ More Info]  │  │   │
│  │  │  User: Show schedule │  │  └──────────────────┘  │   │
│  │  │                      │  │                         │   │
│  │  │  Bot: Here's the...  │  │                         │   │
│  │  │                      │  │                         │   │
│  │  └──────────────────────┘  │                         │   │
│  │                            │                         │   │
│  │  ┌──────────────────────┐  │                         │   │
│  │  │  MESSAGE INPUT       │  │                         │   │
│  │  │  [Type message...] 📤│  │                         │   │
│  │  └──────────────────────┘  │                         │   │
│  └────────────────────────────┴─────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────┐
│       MOBILE LAYOUT             │
│                                 │
│  ┌──────────────────────────┐  │
│  │  HEADER                  │  │
│  │  📚 Pune Book Fest 2025  │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │  CHAT WINDOW             │  │
│  │                          │  │
│  │  Bot: Welcome! 📚        │  │
│  │  User: Hi                │  │
│  │  Bot: How can I help?    │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │  [Type message...] 📤    │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │     Quick Actions        │  │
│  │                          │  │
│  │  [🗓️ Sched] [📅 Days]    │  │
│  │  [🎥 YT]    [👍 FB]      │  │
│  │  [📸 IG]    [🌐 Web]     │  │
│  │  [📍 Loc]   [ℹ️ Info]    │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

## Message Bubbles

### Bot Messages (Left-aligned)
```
┌─────────────────────────────────────┐
│ 📚  ┌─────────────────────────────┐ │
│     │ Hello! Welcome to Pune      │ │
│     │ Book Fest 2025 📚           │ │
│     │                             │ │
│     │ How can I help you?         │ │
│     └─────────────────────────────┘ │
│     10:30 AM                        │
└─────────────────────────────────────┘
```

### User Messages (Right-aligned)
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐ 👤 │
│  │ Show me the schedule        │    │
│  │ for Day 1                   │    │
│  └─────────────────────────────┘    │
│                        10:31 AM     │
└─────────────────────────────────────┘
```

## Menu Buttons Design

Each button has:
- **Icon** (28px emoji at top)
- **Label** (13px text below)
- **White background** (default)
- **Purple gradient** (on hover)
- **Rounded corners** (15px border-radius)
- **Shadow** (smooth drop shadow)

### Button States

**Default:**
- Background: White
- Text: Dark gray (#333)
- Shadow: Light

**Hover:**
- Background: Purple gradient (#8976a5 → #100223d0)
- Text: White
- Shadow: More prominent
- Transform: Slight lift (-2px)

## Animations

### Page Load
- Fade in with slide up (0.5s duration)

### Messages
- Slide in from bottom (0.3s duration)
- Each message animates individually

### Typing Indicator
- 3 dots bouncing animation
- Infinite loop with staggered timing

### Buttons
- Staggered fade-in (0.05s delay between each)
- Scale on hover (1.05x)
- Scale on click (0.95x)

## Responsive Breakpoints

- **Mobile**: < 768px
  - Stack chat and menu vertically
  - 2-column button grid
  - Smaller text sizes

- **Tablet**: 768px - 1024px
  - Stack chat and menu vertically
  - 4-column button grid
  - Medium text sizes

- **Desktop**: > 1024px
  - Side-by-side layout
  - Auto-fit button grid
  - Full text sizes

## Interactive Elements

### Chat Input
- **Border**: 2px transparent (default)
- **Border on focus**: 2px purple (#8976a5)
- **Shadow on focus**: Purple glow
- **Placeholder**: Light gray (#aaa)

### Send Button
- **Shape**: Circular (50px diameter)
- **Background**: Purple gradient
- **Icon**: Send arrow (white)
- **Hover**: Lift effect (-2px)
- **Disabled**: 50% opacity

### Scrollbar
- **Width**: 8px
- **Track**: Light transparent
- **Thumb**: Purple (#8976a5)
- **Thumb hover**: Dark purple

## Accessibility Features

- ✅ High contrast text
- ✅ Large touch targets (minimum 44px)
- ✅ Clear focus indicators
- ✅ Readable font sizes
- ✅ Smooth scroll behavior
- ✅ Loading states
- ✅ Error messages

## Sample Event Display

```
━━━ Day 1 - January 10, 2025 ━━━

🕐 9:00 AM
📖 Opening Ceremony
👤 Chief Guest: Amish Tripathi
📍 Main Auditorium

🕐 11:00 AM
📖 Author Talk: The Art of Storytelling
👤 Chetan Bhagat
📍 Hall A

🕐 2:00 PM
📖 Poetry Slam Competition
👤 Various Artists
📍 Open Air Theatre
```

## Emojis Used

- 📚 - Book/Reading
- 👤 - User
- 🗓️ - Schedule
- 📅 - Calendar
- 🎥 - YouTube
- 👍 - Facebook/Like
- 📸 - Instagram
- 🌐 - Website/Globe
- 📍 - Location/Pin
- ℹ️ - Information
- 🕐 - Clock/Time
- 📖 - Open Book
- 📞 - Phone
- ✉️ - Email
- 🚀 - Launch/Start

## Design Principles

1. **Clean & Modern** - Minimal clutter, focus on content
2. **Friendly & Approachable** - Book emoji, rounded corners
3. **Purple Theme** - Consistent with user preference
4. **Smooth Animations** - Enhance UX without distraction
5. **Responsive** - Works beautifully on all devices
6. **Accessible** - Everyone can use it easily

---

**The design creates a welcoming, book-themed experience that's both functional and beautiful! 📚✨**
