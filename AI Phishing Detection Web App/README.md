# 🛡️ PhishGuard AI - AI-Powered Phishing URL Detection System

<div align="center">

![Status](https://img.shields.io/badge/status-fully%20functional-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

**A modern, responsive web application for detecting phishing URLs using simulated AI/ML algorithms**

[Quick Start](#-quick-start) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 🌟 Overview

PhishGuard AI is a **fully functional, production-ready demo** of a phishing URL detection system powered by machine learning simulation. Built with React, TypeScript, and Tailwind CSS, it features a complete user authentication system, real-time URL analysis, and dynamic analytics dashboard.

### ✨ Highlights

- 🤖 **AI-Powered Detection** - Simulated ML engine with 10+ feature extraction algorithms
- 🔐 **Complete Authentication** - User registration, login, session management
- 📊 **Dynamic Analytics** - Real-time charts and statistics with Recharts
- 🎨 **Modern UI/UX** - Dark cybersecurity theme with neon accents and smooth animations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🚀 **PWA Ready** - Progressive Web App capabilities for installation
- ⚡ **100% Functional** - No dummy buttons, all features work end-to-end

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

```bash
# Clone or navigate to the project directory
cd phishguard-ai

# Install dependencies (if not already installed)
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### First Steps

1. **Open the application** in your browser (typically `http://localhost:5173`)
2. **Create an account** by clicking "Sign Up"
3. **Scan a URL** to test the detection system
4. **View analytics** on the dashboard

---

## 🎯 Features

### 🏠 Landing Page
- Hero section with call-to-action buttons
- Feature showcase (6 cards)
- How It Works workflow (3 steps)
- Smooth scroll navigation
- Responsive design

### 🔍 URL Scanner
**10 Feature Analysis:**
1. URL Length Detection
2. HTTPS Protocol Check
3. Special Character Analysis
4. IP Address Detection
5. Domain Age Estimation
6. Redirection Count
7. Suspicious Keyword Matching
8. Subdomain Analysis
9. Path Depth Calculation
10. Custom Port Detection

**Prediction System:**
- Real-time ML simulation (2-second processing)
- Confidence scoring (55-95%)
- Risk level categorization (Low/Medium/High/Critical)
- Color-coded results
- Detailed feature breakdown

### 📊 Analytics Dashboard
**Visualizations:**
- Total scans counter
- Phishing vs. Legitimate distribution
- Risk level breakdown (4 categories)
- Monthly trend analysis (6 months)
- Interactive pie and line charts

**Real-Time Updates:**
- Charts update after each scan
- Persistent data storage
- Historical trend analysis

### 🔐 Authentication System
**User Management:**
- Registration with validation
- Login with credential checking
- Session persistence
- Logout functionality
- User profile display

**Form Validation:**
- Email format checking
- Password strength requirements
- Duplicate account prevention
- Real-time error messages

---

## 🏗️ Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library with hooks
- **TypeScript** - Type-safe development
- **React Router 7** - Multi-page navigation
- **Tailwind CSS 4** - Utility-first styling

### UI Components & Libraries
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Motion** - Smooth animations

### Data & State Management
- **LocalStorage** - Client-side database simulation
- **React Hooks** - State management (useState, useEffect)
- **Custom Services** - ML engine and database layer

### Build Tools
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

---

## 📁 Project Structure

```
phishguard-ai/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Layout.tsx              # Main layout wrapper
│   │   │   ├── Navigation.tsx          # Top navigation bar
│   │   │   └── ui/                     # Reusable UI components
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx         # Homepage with hero & features
│   │   │   ├── ScanPage.tsx            # URL scanner interface
│   │   │   ├── DashboardPage.tsx       # Analytics dashboard
│   │   │   ├── LoginPage.tsx           # User login
│   │   │   ├── SignUpPage.tsx          # User registration
│   │   │   └── NotFoundPage.tsx        # 404 error page
│   │   ├── services/
│   │   │   ├── mlEngine.ts             # ML feature extraction & prediction
│   │   │   └── database.ts             # LocalStorage database layer
│   │   ├── App.tsx                     # Root component
│   │   ├── routes.tsx                  # Route configuration
│   │   └── pwa.ts                      # PWA service worker
│   └── styles/
│       ├── index.css                   # Global styles & animations
│       ├── theme.css                   # Design system tokens
│       └── tailwind.css                # Tailwind directives
├── public/
│   └── manifest.json                   # PWA manifest
├── FEATURES.md                         # Detailed feature documentation
├── QUICK_START.md                      # Quick start guide
└── README.md                           # This file
```

---

## 🔬 How It Works

### ML Detection Algorithm

```typescript
// Simplified scoring system
phishingScore = 0

// URL Length: Longer URLs are suspicious
if (length > 75) phishingScore += 15

// HTTPS: Lack of HTTPS is a red flag
if (!hasHTTPS) phishingScore += 20

// IP Address: Direct IP usage is suspicious
if (hasIPAddress) phishingScore += 25

// Special Characters: Excessive use is suspicious
if (specialChars > 5) phishingScore += 15

// ... 6 more feature checks

// Final Prediction
prediction = phishingScore > 50 ? "phishing" : "legitimate"
confidence = calculateConfidence(phishingScore)
```

### Data Flow

1. **User Input** → URL entered in scanner
2. **Feature Extraction** → 10+ URL characteristics analyzed
3. **ML Prediction** → Score calculated, prediction made
4. **Database Storage** → Results saved to localStorage
5. **Dashboard Update** → Charts refresh with new data

---

## 🎨 Design System

### Color Palette
```css
/* Background */
--bg-primary: #0a1628    /* Dark blue */
--bg-secondary: #0f1f3a  /* Medium blue */

/* Accents */
--accent-cyan: #22d3ee   /* Neon cyan */
--accent-blue: #3b82f6   /* Bright blue */

/* Status Colors */
--safe: #22c55e          /* Green */
--warning: #f59e0b       /* Orange */
--danger: #ef4444        /* Red */
--info: #3b82f6          /* Blue */
```

### Typography
- **Font:** System font stack
- **Headings:** Bold, gradient text effects
- **Body:** Regular weight, high contrast

### Components
- **Rounded corners:** 16px (1rem)
- **Shadows:** Cyan glow effects
- **Transitions:** 200-300ms smooth
- **Spacing:** 8px base unit

---

## 📱 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|-----------|--------|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768px - 1024px | 2 columns, compact spacing |
| Desktop | > 1024px | 3 columns, full navigation |

---

## 🧪 Testing Guide

### Manual Testing Checklist

#### Navigation Tests
- [ ] Logo links to homepage
- [ ] Section scroll buttons work
- [ ] Page routing buttons work
- [ ] Mobile menu opens/closes
- [ ] All links navigate correctly

#### Scanner Tests
- [ ] URL input accepts text
- [ ] Scan button triggers analysis
- [ ] Loading spinner displays
- [ ] Results show prediction
- [ ] Feature cards populate
- [ ] Risk colors change correctly
- [ ] Example URLs work

#### Authentication Tests
- [ ] Sign up creates account
- [ ] Login validates credentials
- [ ] Session persists
- [ ] Logout clears session
- [ ] Error messages display
- [ ] Toast notifications appear

#### Dashboard Tests
- [ ] Stats cards show counts
- [ ] Pie charts render
- [ ] Line chart displays
- [ ] Charts update after scans
- [ ] Empty state shows message

### Test URLs

**Legitimate (Low Risk):**
```
https://www.google.com
https://github.com
https://stackoverflow.com
```

**Suspicious (Medium-High Risk):**
```
http://192.168.1.1/login-verify-account
http://secure-login.suspicious-site.com/update
```

**Phishing (High-Critical Risk):**
```
http://secure-banking-login-verify.suspicious-domain.xyz/account/update
http://paypal-security-update.random-domain.tk/confirm/signin
```

---

## 💾 Data Storage

### LocalStorage Schema

**Users Collection:**
```json
{
  "users": [
    {
      "id": "user_1234567890_abc123",
      "email": "user@example.com",
      "password_hash": "base64_encoded_password",
      "name": "John Doe",
      "created_at": "2024-03-01T12:00:00.000Z"
    }
  ]
}
```

**URL Logs Collection:**
```json
{
  "url_logs": [
    {
      "id": "log_1234567890_xyz789",
      "url": "https://example.com",
      "prediction": "legitimate",
      "confidence": 85,
      "riskLevel": "low",
      "features": { /* 10+ extracted features */ },
      "timestamp": "2024-03-01T12:30:00.000Z",
      "user_id": "user_1234567890_abc123"
    }
  ]
}
```

**Session:**
```json
{
  "session": {
    "user_id": "user_1234567890_abc123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## 🔒 Security Considerations

### Current Implementation (Demo)
⚠️ **Not production-ready** - This is a demonstration project:
- Passwords encoded with `btoa()` (reversible)
- Data stored in localStorage (client-side only)
- No server-side validation
- No rate limiting
- No HTTPS enforcement

### Production Recommendations
For a production deployment, implement:

1. **Backend API**
   - Express.js or Flask server
   - PostgreSQL or MongoDB database
   - RESTful API endpoints

2. **Authentication**
   - bcrypt or argon2 password hashing
   - JWT or session tokens
   - Refresh token rotation
   - OAuth integration

3. **Security Headers**
   - CORS configuration
   - CSRF protection
   - XSS prevention
   - Content Security Policy

4. **Infrastructure**
   - HTTPS/TLS encryption
   - Rate limiting
   - Input sanitization
   - SQL injection prevention

5. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring
   - User behavior tracking

---

## 📚 Documentation

- **[FEATURES.md](./FEATURES.md)** - Comprehensive feature breakdown
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide with examples

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

### Adding New Features

1. **New Page:**
   - Create component in `src/app/pages/`
   - Add route in `src/app/routes.tsx`
   - Update navigation in `Navigation.tsx`

2. **New Service:**
   - Create service file in `src/app/services/`
   - Export functions
   - Import in components

3. **New UI Component:**
   - Create in `src/app/components/`
   - Style with Tailwind
   - Export and import where needed

---

## 🤝 Contributing

This is a demo project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - Feel free to use this project for learning and demonstration purposes.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind Labs** - For Tailwind CSS
- **Recharts Team** - For the charting library
- **Radix UI** - For accessible components
- **Lucide** - For beautiful icons

---

## 📞 Support

For questions or issues:
- Check the [FEATURES.md](./FEATURES.md) documentation
- Read the [QUICK_START.md](./QUICK_START.md) guide
- Review the inline code comments

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

⭐ **Star this project if you find it helpful!** ⭐

</div>
