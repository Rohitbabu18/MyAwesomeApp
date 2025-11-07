# 📱 React Native Post Feed App

## 🎥 Demo Video

[![Watch the video](https://drive.google.com/file/d/1DR9GOAUkD02ntv8a83u6M1OUVrEFsfSF/view?usp=sharing)](https://drive.google.com/file/d/1eJr7QFBTNdKyQTMw62je26xxK5w4M3QY/view?usp=sharing)

## Summary

A modern, theme-based React Native application built with TypeScript and React Navigation.  
The app displays a list of posts fetched from an API, includes a search bar for filtering posts by title,  
and allows navigation to detailed post screens. It follows modular folder structuring and uses custom theming.

---

## 🚀 Features

- 🔍 **Search** — Filter posts by title with debounce optimization.  
- 📰 **Home Feed** — Fetch and render post list using FlatList.  
- 📄 **Details Screen** — View full post content with back navigation.  
- 🎨 **Dynamic Theming** — Custom light/dark theme support via `ThemeContext`.  
- ⚙️ **Reusable Components** — Toasts, Fonts, and Utility components.  
- 🔁 **Pull-to-Refresh** — Refresh post list easily.  
- 💾 **Async Storage** — Persistent data storage using MMKV or AsyncStorage.

---

## 📁 Folder Structure

src/
├── components/
│ ├── ThemeContext.tsx
│ ├── theme.ts
│ ├── fonts.ts
│ ├── toast/
│ │ └── Toast.tsx
│ └── debounce/
│ └── index.ts
├── screens/
│ ├── Home/
│ │ ├── Home.tsx
│ │ ├── Post.tsx
│ │ └── Types.ts
│ └── Details/
│ └── Details.tsx
├── services/
│ ├── index.ts
│ ├── apiURLs.ts
│ ├── apiStatus.ts
│ └── postService.ts
└── assets/
└── icons/


## ⚙️ Setup Instructions

### 1 Clone the repository
```bash
git clone https://github.com/Rohitbabu18/MyAwesomeApp.git
cd MyAwesomeApp
```

### 2 Clone the repository
```bash
yarn install
```

### 3 Run the project
```bash
npm run android
```


👨‍💻 Author

Rohit Jaat
React Native Developer | 3+ Years Experience
💼 Focus: Theming, Navigation, Performance, Firebase Auth, and UI Optimization.
