# Design Guidelines: Math Fun Learning - Aplikasi Pembelajaran Matematika SD

## Design Approach: Reference-Based (Educational Children's Apps)

**Primary References:** Khan Academy Kids, Duolingo, ABCmouse
**Key Principle:** Create a joyful, confidence-building learning environment through playful visuals and immediate positive reinforcement.

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Light Mode - Default for Kids):**
- Primary: 220 85% 55% (Bright blue - trust & learning)
- Secondary: 280 70% 60% (Playful purple - creativity)
- Success: 140 65% 50% (Cheerful green - achievement)
- Warning: 35 95% 60% (Sunny orange - attention)
- Background: 210 20% 98% (Soft white)
- Surface: 0 0% 100% (Pure white cards)

**Accent Colors:**
- Star/Reward: 45 100% 55% (Golden yellow)
- Fun Red: 0 75% 60% (Encouraging red for game elements)
- Sky Blue: 200 80% 65% (Light blue for secondary elements)

**Dark Mode (Optional for older kids):**
- Background: 220 15% 12%
- Surface: 220 15% 18%
- Adjust primary colors: increase lightness by 10-15%

### B. Typography

**Font Families:**
- Primary: 'Quicksand' (rounded, friendly, highly readable for children)
- Headings: 'Fredoka One' (bold, playful for titles and game screens)
- Monospace: 'Roboto Mono' (for numbers and math equations)

**Scale:**
- Hero/Game Titles: text-5xl to text-6xl font-bold
- Section Headings: text-3xl to text-4xl font-semibold
- Body Text: text-lg to text-xl (larger for readability)
- Buttons: text-lg font-semibold
- Math Problems: text-2xl to text-3xl font-mono

### C. Layout System

**Spacing Primitives:** 4, 6, 8, 12, 16 (p-4, gap-6, my-8, py-12, space-y-16)

**Grid System:**
- Container: max-w-7xl mx-auto px-4 lg:px-8
- Game Cards: 2-column on tablet (md:grid-cols-2), 3-column on desktop (lg:grid-cols-3)
- Learning Modules: Single column on mobile, 2-column on desktop
- Max content width for text: max-w-4xl

### D. Component Library

**Navigation:**
- Large, colorful navigation with icons and text labels
- Sticky header with quick access to: Home, Learn, Games, Progress
- Fun icon badges showing current points/stars

**Cards (Learning Modules & Games):**
- Rounded-3xl borders with soft shadow-xl
- Colorful gradient backgrounds or solid colors with white text
- Large touch targets (min-h-20 for buttons)
- Hover: scale-105 transform with transition-transform
- Icon at top, title, brief description, "Start" button

**Game Components:**
- Quiz: Large answer buttons (min-h-16) in a grid layout with emoji feedback
- Timer: Circular progress indicator with countdown
- Score Display: Large numbers with star animations
- Drag-and-Drop: Visual drop zones with dashed borders that glow on hover
- Answer Feedback: Full-screen celebration animations for correct answers (confetti, stars), gentle shake for incorrect

**Progress Tracking:**
- Horizontal progress bars with gradient fills
- Star ratings (1-3 stars per lesson)
- Badge collection grid with locked/unlocked states
- Weekly streak counter with fire emoji

**Buttons:**
- Primary: Large rounded-full buttons with bg-gradient-to-r from-primary to-secondary
- Game Start: Extra large (px-12 py-6) with pulse animation
- Secondary: Outline buttons with thick border (border-4)

**Rewards System:**
- Star collection display in header
- Badge modal with 3D-style illustrations
- Level-up animations with confetti effect
- Achievement toast notifications (bottom-right)

### E. Visual Elements

**Illustrations & Images:**
- Hero Section: Cheerful illustration of children learning math with floating numbers and shapes (cartoon style)
- Game Sections: Unique illustrated characters for each game type (quiz robot, number detective, puzzle master)
- Background Patterns: Subtle math-themed patterns (numbers, equations, geometric shapes in light opacity)
- Success States: Animated character celebrations

**Icons:**
- Use Font Awesome for consistent, playful icons
- Add: fa-plus-circle, Subtract: fa-minus-circle, Multiply: fa-times-circle, Divide: fa-divide
- Game: fa-gamepad, Trophy: fa-trophy, Star: fa-star

**Animations:**
- Entry animations: fade-in and slide-up for cards (stagger effect)
- Button press: scale-95 active state
- Correct answer: bounce animation with green check
- Reward earned: scale and rotate animation
- Page transitions: smooth fade transitions

---

## Page-Specific Guidelines

### Homepage
- Vibrant hero with illustration, app title "Math Fun Learning", tagline "Belajar Matematika Jadi Menyenangkan!"
- 4-section grid: Penjumlahan, Pengurangan, Perkalian, Pembagian (colorful cards)
- Featured games carousel with 3 mini-games
- Progress overview widget
- Fun footer with team names in playful typography

### Learning Modules
- Step-by-step visual explanations with illustrations
- Interactive examples with immediate feedback
- Practice problems with increasing difficulty
- Progress indicator showing completed steps

### Game Screens
- Full-screen immersive experience
- Clear game instructions with illustrations
- Prominent timer and score display
- Encouraging messages throughout ("Good job!", "Keep going!", "Amazing!")

### Footer
- Colorful section with gradient background
- Team member names in grid layout with fun icons
- "UIN MATARAM 2025" prominently displayed
- Playful sign-off message

---

## Accessibility & UX

- High contrast text (WCAG AA minimum)
- Large, clear fonts (minimum 18px body text)
- Touch targets minimum 44x44px
- Keyboard navigation for all interactive elements
- Screen reader friendly labels
- Reduced motion option for animations
- Clear error messages with helpful hints
- Positive reinforcement language throughout

**Key Principle:** Every interaction should feel rewarding and encourage continued learning. Use color, animation, and friendly language to create a safe, fun learning environment.