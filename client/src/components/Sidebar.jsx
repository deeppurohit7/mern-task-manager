import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { ProfileModal } from './ProfileModal';
import {
  LayoutDashboard,
  CheckSquare,
  CheckCircle2,
  Clock,
  ListTodo,
  Users,
  Trash2,
  X,
  Layers,
  Settings
} from 'lucide-react';

export function Sidebar() {
  const context = useTasks();
  const {
    sidebarOpen = true,
    setSidebarOpen = () => {},
    trashedTasks = [],
    currentUser = { name: 'Deep Purohit', role: 'Admin', avatar: 'DP' },
    setProfileModalOpen,
  } = context || {};

  const [localModalOpen, setLocalModalOpen] = useState(false);

  const handleOpenProfile = () => {
    if (typeof setProfileModalOpen === 'function') {
      setProfileModalOpen(true);
    }
    setLocalModalOpen(true);
  };

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Completed', path: '/completed', icon: CheckCircle2 },
    { name: 'In Progress', path: '/in-progress', icon: Clock },
    { name: 'To Do', path: '/todo', icon: ListTodo },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Trash', path: '/trash', icon: Trash2, badge: trashedTasks.length },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => {
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity cursor-pointer group"
            title="Return to Dashboard"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">TaskManager</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 flex-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </div>
                {Boolean(link.badge) && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Standalone Clickable User Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80">
          <button
            type="button"
            onClick={handleOpenProfile}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all text-left cursor-pointer group"
            title="Open Profile Settings"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                {currentUser?.avatar || 'DP'}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-800 block truncate group-hover:text-blue-600 transition-colors">
                  {currentUser?.name || 'Deep Purohit'}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {currentUser?.role || 'Admin'} & Lead
                </span>
              </div>
            </div>
            <Settings className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1 transition-colors" />
          </button>
        </div>
      </aside>

      {/* Profile Modal Triggered Directly from Sidebar */}
      <ProfileModal
        isOpen={localModalOpen}
        onClose={() => setLocalModalOpen(false)}
      />
    </>
  );
}