# 🎯 دليل القدرات - Qudrat Guide

<div dir="rtl">

تطبيق ويب تقدمي (PWA) شامل لمراجعة اختبار القدرات العامة. متجاوب بالكامل ويعمل على جميع الأجهزة.

</div>

## ✨ Features

- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🌙 **Dark Mode** - Eye-friendly night mode
- 🔍 **Smart Search** - Instant search across all content
- ⭐ **Bookmarks** - Save important formulas for quick review
- 📶 **Offline Support** - Works without internet (PWA)
- 🚀 **Installable** - Can be installed as a native app
- 🎨 **Modern UI** - Clean and intuitive interface
- 🇸🇦 **Arabic First** - Fully supports RTL and Arabic language

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in your browser.

### Option 2: Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then open: http://localhost:8000
```

### Option 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `qudrat-app` folder
3. Get instant URL!

## 📚 Content Sections

<div dir="rtl">

- **القسم اللفظي** - Verbal section (5 strategies)
- **القسم الكمي** - Quantitative section (formulas & shortcuts)
- **الهندسة** - Geometry (triangles, circles, squares)
- **الجبر والإحصاء** - Algebra & Statistics
- **استراتيجيات النجاح** - Success strategies
- **المفضلة** - Saved bookmarks

</div>

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, CSS Variables
- **JavaScript ES6+** - Modern vanilla JS
- **PWA** - Progressive Web App
- **Service Worker** - Offline functionality
- **LocalStorage** - Persistent data

## 📱 Installation

### Android
1. Open the site in Chrome
2. Tap menu (⋮) → "Add to Home screen"

### iOS
1. Open the site in Safari
2. Tap share button → "Add to Home Screen"

### Desktop
1. Open in Chrome/Edge
2. Look for install icon in address bar
3. Click "Install"

## 🎨 Customization

### Change Colors
Edit CSS variables in `css/style.css`:

```css
:root {
    --primary: #f5ab4a;
    --primary-dark: #d99335;
    --primary-light: #fff9f0;
}
```

### Add Content
Edit content functions in `js/app.js`:
- `getVerbalContent()` - Verbal section
- `getQuantitativeContent()` - Quantitative section
- `getGeometryContent()` - Geometry section

## 📂 Project Structure

```
qudrat-app/
├── index.html              # Main page
├── manifest.json          # PWA manifest
├── service-worker.js      # Offline support
├── css/
│   ├── style.css         # Main styles
│   ├── mobile.css        # Responsive styles
│   └── dark-mode.css     # Dark theme
├── js/
│   ├── app.js           # Core functionality
│   ├── navigation.js    # Navigation system
│   ├── search.js        # Search engine
│   └── bookmarks.js     # Bookmarks manager
└── assets/
    └── icons/           # App icons
```

## 🌐 Live Demo

**Demo:** [Add your deployed URL here]

## 📄 License

Open source for educational purposes.

## 👨‍💻 Author

**Prepared by:** Yimnak

---

<div dir="rtl">

## 🇸🇦 للمستخدمين العرب

### التثبيت السريع

1. افتح الموقع على جهازك
2. على **Android**: القائمة ← إضافة للشاشة الرئيسية
3. على **iOS**: مشاركة ← إضافة للشاشة الرئيسية

### الميزات الرئيسية

- ✅ جميع اختصارات القدرات في مكان واحد
- ✅ بحث سريع في جميع القوانين
- ✅ حفظ القوانين المهمة
- ✅ وضع ليلي مريح للعين
- ✅ يعمل بدون إنترنت

### الأقسام

1. **القسم اللفظي** - احصد، كلهم إلا، التناظر اللفظي
2. **القسم الكمي** - الحساب، الكسور، الأسس
3. **الهندسة** - المثلثات، الدوائر، المساحات
4. **الجبر** - المتطابقات، الاحتمالات
5. **الاستراتيجيات** - إدارة الوقت، نصائح ذهبية

</div>

---

⭐ **إذا أعجبك المشروع، لا تنسَ وضع نجمة (Star)!**

