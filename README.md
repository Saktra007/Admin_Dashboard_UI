# 📊 Admin Dashboard UI (React + TailwindCSS)

![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-green)

A modern and responsive **Admin Dashboard UI** built with **React** and **Tailwind CSS**.  
This dashboard focuses on **user management, clean UI, and real-world usability**, making it ideal for small to medium web applications.

---

## 🚀 Live Demo

🔗 https://admin-dashboard-ui-five.vercel.app/

---

## ✨ Features

- 📋 User Management (Add / Edit / Delete)
- 🔍 Search users by name or email
- 🏷️ Filter users by status (All / Active / Inactive)
- 🌙 Dark Mode with LocalStorage persistence
- 💾 Data persistence using LocalStorage
- 📊 Dashboard statistics cards
- 🧩 Modular & reusable React components
- 📱 Fully responsive (Desktop & Mobile)

---

## 🛠️ Built With

- **React** (Hooks: useState, useEffect, useMemo)
- **Tailwind CSS**
- **Lucide React Icons**
- **JavaScript (ES6+)**
- **LocalStorage API**

---

## 📸 Screenshots

![Dashboard Light Mode](image.png)
![Dashboard Dark Mode](image-1.png)
![User Management Modal](image-2.png)

---

```txt
src/
├── assets/
│   ├── Logo.png
│   └── Profile.png
│
├── components/
│   ├── DarkModeToggle.jsx
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── StatCard.jsx
│   ├── Table.jsx
│   ├── FilterBar.jsx
│   ├── UserModal.jsx
│   └── EditUserModal.jsx
│
├── data/
│   └── users.js
│
├── pages/
│   └── Dashboard.jsx
│
├── App.jsx
└── main.jsx

```

---

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Saktra007/Admin_Dashboard_UI.git
```

2. Navigate to the project folder

```bash
cd Admin_Dashboard_UI

```

3. Install dependencies

```bash
npm install
```

4. Run the project locally

```bash
npm run dev
```
