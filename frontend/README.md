# GeoBD Frontend 🇧🇩

Modern, responsive frontend for the Bangladesh Geo API Platform with interactive maps, live API testing, and comprehensive documentation.

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
- **BD Icon:** Consistent branding with bdicon.png

## 🚀 Features

- **Hero Section** with Bangladesh imagery and smooth scrolling
- **Interactive Map** with MapLibre GL integration
- **Live API Explorer** with real-time endpoint testing
- **Complete API Documentation** with all 4 administrative levels + GI Products
- **Dedicated GI Products Catalog** `/gi-products` with advanced filtering
- **Stats Section** with animated counters
- **Responsive Design** for all devices
- **Smooth Animations** with Framer Motion
- **Smooth Scrolling** navigation with react-scroll
- **BD Icon Integration** throughout the application

## 🛠️ Tech Stack

- **React 18** with hooks and modern patterns
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **MapLibre GL** for interactive mapping
- **Framer Motion** for smooth animations
- **React Router** for client-side routing
- **React Scroll** for smooth scrolling navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.jsx              # Hero section with smooth scrolling
│   ├── Navbar.jsx            # Navigation with scroll links
│   ├── Stats.jsx             # Animated statistics
│   ├── APIShowcase.jsx       # API feature showcase
│   ├── InteractiveMap.jsx    # MapLibre GL map component
│   ├── MapDocumentation.jsx  # Map usage documentation
│   ├── APIExplorer.jsx       # Live API testing tool
│   ├── GIProductsSection.jsx # Curated homepage GI preview
│   └── Footer.jsx            # Footer with BD branding
├── pages/              # Page components
│   ├── APIDocs.jsx           # Complete API documentation
│   └── GIProductsPage.jsx    # Complete GI products catalog
├── services/           # API services
│   └── api.js               # Axios API configuration
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles with Tailwind
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

## 🗺️ Interactive Map Features

### MapLibre GL Integration
- **Bangladesh Boundary**: Clear visualization with green outline
- **District Markers**: All 64 districts with clickable markers
- **District Labels**: Clear text labels for all districts
- **Search Navigation**: Fly to locations based on dropdown selection
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Data**: Live API integration for location information

### Map Functionality
- 🗺️ **Interactive Controls**: Zoom, pan, and navigation
- 📍 **Location Markers**: Green markers with white borders
- 🏷️ **District Labels**: Clear text labels for all districts
- 🎯 **Click Interactions**: Detailed popups with location information
- 🔄 **Smooth Animations**: Fly-to animations for selected locations

## 🧪 API Explorer Features

### Live Testing
- **Real API Calls**: Actual requests to backend endpoints
- **Dynamic Endpoints**: URL updates based on selection
- **4-Level Navigation**: Division → District → Upazila → Union
- **Copy Functionality**: One-click endpoint copying
- **Response Viewer**: Formatted JSON responses
- **Real-time Updates**: Live data as you select locations

### Usage
1. Select administrative levels from dropdowns
2. Watch the endpoint URL update in real-time
3. Copy the full URL for your application
4. View live JSON responses with formatting

## 🎯 Key Components

### Hero Section
- **Bangladesh Imagery**: Professional background with bdicon.png
- **Smooth Scrolling**: React-scroll navigation to sections
- **Call-to-action Buttons**: Map and API Docs access
- **Feature Cards**: Lightning Fast, Complete Data, Developer First, Interactive Maps

### Interactive Map
- **Simplified Navigation**: Division → District selection
- **District Markers**: All districts shown initially with labels
- **Search Functionality**: Fly to selected locations
- **Clean Interface**: No division markers initially for better UX

### API Documentation
- **Complete Coverage**: All 4 administrative levels and Geographical Indications (GI).
- **Production URLs**: Ready-to-use geo-bd-apis.onrender.com endpoints
- **Interactive Examples**: Copy-to-clipboard functionality
- **Search Examples**: Union search and filtering examples

### API Explorer
- **Live Testing**: Real API calls with actual data
- **Dynamic URLs**: Automatic endpoint generation
- **Formatted Responses**: Pretty-printed JSON
- **4-Level Hierarchy**: Complete administrative structure

## 🎨 Design Philosophy

- **80% White UI** with minimal color
- **Green accents** for primary actions and Bangladesh theme
- **Red dots** for flag elements and alerts
- **Clean typography** with Inter font
- **Smooth animations** for all interactions
- **Developer-first** documentation and tools
- **BD Branding** consistent use of bdicon.png

## 📱 Responsive Design

- **Mobile:** Full-width layout with touch-friendly controls
- **Tablet:** Optimized spacing and navigation
- **Desktop:** Multi-column grids with hover effects
- **Interactive Elements:** Touch-friendly map controls

## 🎭 Animations & UX

- **Page transitions** with Framer Motion fade-in
- **Smooth scrolling** with react-scroll
- **Hover states** on interactive elements
- **Scroll animations** with viewport detection
- **Loading states** with professional spinners
- **Toast notifications** for user feedback
- **Map animations**: Smooth fly-to and marker transitions

## 🔧 Environment Variables

Create a `.env` file in the root:

```env
# Point to your local backend
VITE_API_URL=http://localhost:5000/api

# OR Point to the production backend
# VITE_API_URL=https://geo-bd-apis.onrender.com/api
```

## 🌍 Navigation Features

### Smooth Scrolling
- **Hero to Map**: Smooth scroll to interactive map
- **API Explorer**: Scroll to live testing section
- **Navbar Links**: All section links with smooth animations
- **React Scroll**: Professional smooth scrolling library

### Navigation Structure
- **Home**: Landing page with hero section
- **Map**: Interactive map with district selection
- **API Explorer**: Live endpoint testing tool
- **API Docs**: Comprehensive documentation
- **GitHub**: External link to repository

## � Data Integration

### API Integration
- **Live Data**: Real-time API calls to backend
- **Error Handling**: Professional error messages
- **Loading States**: User-friendly loading indicators
- **Caching**: Optimized API response handling

### Administrative Levels
- **64 Districts**: All districts with coordinates
- **495+ Upazilas**: Sub-districts with relationships
- **4,500+ Unions**: Complete union coverage
- **Geographical Indications (GI)**: Certified national products with descriptions and categories

## �📝 License

MIT License - Free forever 🇧🇩

## 🌟 What Makes This Special

1. **Interactive Maps** - Beautiful MapLibre GL integration
2. **Live API Testing** - Real-time endpoint explorer
3. **Complete Coverage** - All 4 administrative levels
4. **Smooth Navigation** - Professional scrolling experience
5. **BD Branding** - Consistent Bangladesh theme
6. **Developer First** - Tools and documentation
7. **Production Ready** - API deployed on Render, Frontend on Vercel
8. **Modern Stack** - Latest React and mapping technologies
