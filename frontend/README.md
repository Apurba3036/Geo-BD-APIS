# GeoBD Frontend 🇧🇩

Modern, responsive frontend for the Bangladesh Geo API Platform with clean white + Bangladesh flag design.

## 🎨 Design System

### Colors
- **Primary Green:** `#006A4E` (Bangladesh flag green)
- **Accent Red:** `#F42A41` (Bangladesh flag red)
- **Base White:** Clean white UI
- **Text Gray:** `#1f2937`

### Typography
- **Font:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700

### Components
- **Cards:** `rounded-2xl shadow-sm hover:shadow-md transition`
- **Buttons:** Primary (green) and Secondary (gray)
- **Inputs:** Rounded with green focus state

## 🚀 Features

- **Hero Section** with Bangladesh flag vibe
- **API Showcase** with copy-to-clipboard
- **Interactive Map** with dropdown filters
- **Smart Search** with real-time results
- **Stats Section** with animated counters
- **API Docs** with developer-first design
- **Responsive Design** for all devices
- **Smooth Animations** with Framer Motion

## 🛠️ Tech Stack

- **React 18** with hooks
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── Stats.jsx
│   ├── APIShowcase.jsx
│   ├── InteractiveMap.jsx
│   ├── SmartSearch.jsx
│   └── Footer.jsx
├── pages/              # Page components
│   └── APIDocs.jsx
├── services/           # API services
│   └── api.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## 🎯 Key Components

### Hero Section
- Bangladesh flag animation
- Green underline accent
- Call-to-action buttons
- Feature highlights

### API Showcase
- Interactive code examples
- Copy-to-clipboard functionality
- Response previews
- Method badges

### Interactive Map
- Division → District → Upazila dropdowns
- Location selection
- Map integration placeholder
- Selection info display

### Smart Search
- Real-time search
- District and upazila results
- Bengali name support
- Official government links

### API Documentation
- Sidebar navigation
- Code examples
- Response schemas
- Copy functionality

## 🎨 Design Philosophy

- **80% White UI** with minimal color
- **Green accents** for primary actions
- **Red dots** for flag elements
- **Clean typography** with Inter font
- **Smooth animations** for interactions
- **Developer-first** documentation

## 📱 Responsive Design

- **Mobile:** Full-width layout
- **Tablet:** Optimized spacing
- **Desktop:** Multi-column grids
- **Touch-friendly** interactions

## 🎭 Animations

- **Page transitions** with fade-in
- **Hover states** on interactive elements
- **Scroll animations** with viewport detection
- **Loading states** with spinners
- **Toast notifications** for feedback

## 🔧 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 License

MIT License - Free forever 🇧🇩
