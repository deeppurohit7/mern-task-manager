# MERN Task Manager (Time To Program Tutorial Spec)

A production-grade, enterprise-ready full-stack Task Management System built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS, exactly replicating the layout, design language, and feature set of the [Time To Program](https://www.youtube.com/watch?v=fZK57PxKC-0) reference tutorial.

---

## 🚀 Features

- **Dashboard**: 4 summary telemetry cards (Total Tasks, Completed, In Progress, To Do), priority distribution charts, stage workflow breakdown, recent tasks table, and quick team roster.
- **Dual View Modes**: Seamless switcher between **Board View** (Kanban columns for To Do, In Progress, Completed) and high-density **List View** with interactive actions.
- **Task Management**: Create, edit, duplicate, and soft-delete tasks with title, description, stage, priority levels (High, Medium, Normal, Low), due dates, and assigned team members.
- **Interactive Subtasks**: Track subtask progress with live checkboxes and progress bars.
- **Soft-Delete & Trash Bin**: Dedicated Trash view with instant "Restore" and "Permanent Delete" / "Empty Trash" capabilities.
- **Team Management**: User management with custom avatar badges, roles (Admin vs. Member), titles, and contact info.
- **Express / MongoDB API**: RESTful endpoints with JWT authentication, soft-delete filtering, and Mongoose schemas.
- **Zero-Crash Resilience**: Frontend works seamlessly offline/standalone with persistent `localStorage` and auto-syncs when the Express backend is online.

---

## 🛠️ Quick Start Guide

### 1. Run Client
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run Backend (Optional)
```bash
cd server
npm install
npm run dev
```
*Make sure MongoDB is running or configure `MONGODB_URI` in `server/.env`.*

---

## 📁 Project Architecture
```
mern-task-manager/
├── client/
│   ├── src/
│   │   ├── components/   # Sidebar, Navbar, StatCard, Charts, TaskCard, TaskModal, etc.
│   │   ├── context/      # TaskContext (localStorage + API sync)
│   │   ├── data/         # Realistic seed data
│   │   ├── pages/        # Dashboard, Tasks, Team, Trash, NotFound
│   │   ├── App.jsx       # Layout shell and routing
│   │   ├── main.jsx      # Vite entry point
│   │   └── index.css     # Tailwind CSS setup
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── server/
│   ├── middleware/       # JWT auth middleware
│   │   └── auth.js
│   ├── models/           # Mongoose schemas (User, Task)
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/           # REST API routes (auth, tasks, users)
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   └── users.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── package.json          # Monorepo root helper
└── README.md
```
