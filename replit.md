# Math Fun Learning - Aplikasi Pembelajaran Matematika SD

## Overview
Math Fun Learning adalah aplikasi web pembelajaran matematika interaktif yang dirancang khusus untuk anak-anak SD. Aplikasi ini menyediakan materi pembelajaran untuk 4 operasi matematika dasar (penjumlahan, pengurangan, perkalian, dan pembagian) serta 3 mini game edukatif yang menyenangkan.

## Fitur Utama

### 1. Halaman Beranda
- Hero section dengan desain colorful dan menarik
- Navigasi mudah ke modul pembelajaran dan game
- Footer dengan informasi tim pengembang UIN MATARAM 2025

### 2. Modul Pembelajaran
- **Penjumlahan**: Penjelasan visual dengan contoh dan latihan soal
- **Pengurangan**: Penjelasan visual dengan contoh dan latihan soal
- **Perkalian**: Penjelasan visual dengan contoh dan latihan soal
- **Pembagian**: Penjelasan visual dengan contoh dan latihan soal

Setiap modul memiliki:
- Penjelasan konsep yang mudah dipahami
- 3 contoh soal dengan penjelasan detail
- 3 latihan soal interaktif dengan feedback langsung
- Sistem reward bintang setelah menyelesaikan semua latihan

### 3. Mini Games

#### Quiz Matematika
- Pilih operasi matematika (penjumlahan, pengurangan, perkalian, pembagian)
- 10 soal dengan 4 pilihan jawaban
- Timer 60 detik
- Sistem skor dan reward bintang (1-3 bintang berdasarkan performa)
- Feedback visual untuk jawaban benar/salah

#### Tebak Angka
- Tebak hasil perhitungan dengan petunjuk
- 5 putaran per game
- Petunjuk "terlalu besar" atau "terlalu kecil"
- Skor berdasarkan jumlah percobaan
- Sistem reward bintang

#### Cocokkan Jawaban (Drag & Drop)
- Drag jawaban ke soal yang sesuai
- 5 soal per game
- Interface drag and drop yang interaktif
- Feedback visual saat jawaban benar
- Sistem reward bintang

### 4. Progress Tracker
- Total poin yang dikumpulkan
- Jumlah game yang dimainkan
- Statistik jawaban benar
- Level pengguna saat ini
- Progress belajar per operasi dengan bar progress
- Koleksi badge/achievement

### 5. Achievement System
- Badge "Kemenangan Pertama"
- Badge "Master Kecepatan"
- Badge "Skor Sempurna"
- Badge "Bintang Matematika"
- Badge "Master Latihan"
- Badge "Juara"

### 6. Dark Mode
- Toggle dark/light mode di pojok kanan atas
- Warna yang disesuaikan untuk kenyamanan mata

## Tech Stack

### Frontend
- **React** dengan TypeScript
- **Wouter** untuk routing
- **Tailwind CSS** untuk styling
- **Framer Motion** untuk animasi
- **Radix UI** untuk komponen UI
- **React Query** untuk state management
- **Lucide React** untuk icons

### Backend
- **Express.js** untuk API server
- **In-memory storage** untuk data persistence
- **Zod** untuk validasi data

### Design System
- **Font**: Quicksand (body), Fredoka (headings), Roboto Mono (numbers)
- **Warna Utama**:
  - Primary: Blue (#4C9BFF) - untuk kepercayaan dan pembelajaran
  - Secondary: Purple (#B877D9) - untuk kreativitas
  - Success: Green (#52C67A) - untuk achievement
  - Warning: Orange (#FFB347) - untuk perhatian
  - Accent: Yellow (#FFC735) - untuk reward/bintang

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home.tsx              # Halaman beranda
│   │   │   ├── learn.tsx             # Modul pembelajaran
│   │   │   ├── quiz-game.tsx         # Game quiz matematika
│   │   │   ├── guess-game.tsx        # Game tebak angka
│   │   │   ├── dragdrop-game.tsx     # Game drag & drop
│   │   │   └── progress.tsx          # Halaman progress
│   │   ├── components/
│   │   │   ├── ui/                   # Komponen UI Shadcn
│   │   │   ├── theme-provider.tsx    # Provider dark mode
│   │   │   └── theme-toggle.tsx      # Toggle dark mode
│   │   ├── App.tsx                   # Root component dengan routing
│   │   └── index.css                 # Global styles
│   └── index.html
├── server/
│   ├── routes.ts                     # API routes
│   └── storage.ts                    # In-memory storage
├── shared/
│   └── schema.ts                     # Data schemas & types
└── design_guidelines.md              # Design guidelines
```

## API Endpoints

### User Progress
- `GET /api/progress/:studentName` - Get user progress
- `POST /api/progress` - Create/update user progress

### Game Scores
- `GET /api/scores/:studentName` - Get all game scores
- `GET /api/scores/:studentName/:gameType` - Get scores by game type
- `POST /api/scores` - Add new game score

### Achievements
- `GET /api/achievements/:studentName` - Get user achievements
- `POST /api/achievements` - Add new achievement

### Learning Progress
- `GET /api/learning/:studentName` - Get all learning progress
- `GET /api/learning/:studentName/:operation` - Get progress by operation
- `POST /api/learning` - Update learning progress

## Data Models

### UserProgress
- studentName: string
- totalPoints: number
- level: number
- lastPlayed: timestamp

### GameScore
- studentName: string
- gameType: 'quiz' | 'guess' | 'dragdrop'
- operation: 'addition' | 'subtraction' | 'multiplication' | 'division'
- score: number
- timeSpent: number (seconds)

### Achievement
- studentName: string
- badgeType: string
- operation: string (optional)
- earnedAt: timestamp

### LearningProgress
- studentName: string
- operation: string
- completed: 0 | 1 | 2 (not started, in progress, completed)
- starsEarned: 0-3

## Tim Pengembang
1. Zaenul Amri
2. Silmi Altofunnisa
3. Layya Laily Pebriani
4. Zahra Aji Dwi Rizki

**UIN MATARAM 2025**

## Running the Project
The application runs on `npm run dev` which starts both the Express server and Vite dev server on the same port. The workflow "Start application" is configured to run this automatically.

## Recent Changes
- Initial implementation with all MVP features
- Complete frontend with all pages and games
- Backend API with in-memory storage
- Dark mode support
- Responsive design for mobile and desktop
