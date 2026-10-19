import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import Trash from './pages/Trash';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
        {/* Collapsible SaaS Sidebar */}
        <Sidebar />

        {/* Main Content Layout with 64px (w-64) desktop left offset */}
        <div className="lg:pl-64 flex flex-col min-h-screen">
          {/* Top Navbar */}
          <Navbar />

          {/* Page Routing Views */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks title="All Tasks" />} />
              <Route path="/completed" element={<Tasks filterStage="completed" title="Completed Tasks" />} />
              <Route path="/in-progress" element={<Tasks filterStage="in progress" title="In Progress Tasks" />} />
              <Route path="/todo" element={<Tasks filterStage="todo" title="To Do Tasks" />} />
              <Route path="/team" element={<Team />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}
