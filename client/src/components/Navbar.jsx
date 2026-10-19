import React, { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { ProfileModal } from './ProfileModal';
import {
  Search,
  Bell,
  Menu,
  CheckCheck,
  Trash2,
  User,
  Users,
  Shield,
  LogOut,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultNotificationsList = [
  {
    id: 'n-1',
    title: 'New Task Assigned',
    message: 'Configure MongoDB Atlas and REST endpoints was assigned to you.',
    time: '15m ago',
    unread: true,
    type: 'task',
  },
  {
    id: 'n-2',
    title: 'Priority Escalation',
    message: 'Design Team Sprint Board & Metrics was elevated to High Priority.',
    time: '1h ago',
    unread: true,
    type: 'priority',
  },
  {
    id: 'n-3',
    title: 'New Member Onboarded',
    message: 'Deep Purohit added as Administrator & Full Stack Lead Developer.',
    time: '3h ago',
    unread: false,
    type: 'team',
  },
];

export function Navbar() {
  const context = useTasks();
  const {
    searchQuery = '',
    setSearchQuery = () => {},
    currentUser = { name: 'Deep Purohit', role: 'Admin', avatar: 'DP', email: 'deep@taskmanager.com' },
    setSidebarOpen = () => {},
  } = context || {};

  const [localNotifications, setLocalNotifications] = useState(defaultNotificationsList);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const activeUnreadCount = localNotifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setLocalNotifications([]);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-lg">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks by title, tag, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
              }}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {activeUnreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Notifications
                    </h3>
                    {activeUnreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">
                        {activeUnreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {activeUnreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Mark read
                      </button>
                    )}
                    {localNotifications.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAll}
                        className="text-[11px] text-slate-400 hover:text-red-600 font-medium cursor-pointer"
                        title="Clear all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {localNotifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications at this time
                    </div>
                  ) : (
                    localNotifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3 ${
                          item.unread ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="mt-0.5">
                          {item.type === 'priority' ? (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          ) : item.type === 'team' ? (
                            <Users className="w-4 h-4 text-purple-500" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {item.message}
                          </p>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" /> {item.time}
                          </span>
                        </div>
                        {item.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative pl-2 border-l border-slate-200" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group text-left"
              title="User Account Menu"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm ring-2 ring-transparent group-hover:ring-blue-400 transition-all">
                {currentUser?.avatar || 'DP'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  {currentUser?.name || 'Deep Purohit'}
                </span>
                <span className="text-[10px] text-blue-600 font-semibold block leading-tight flex items-center gap-1">
                  {currentUser?.role || 'Admin'} <ChevronDown className="w-3 h-3 text-slate-400" />
                </span>
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {currentUser?.name || 'Deep Purohit'}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser?.email || 'deep@taskmanager.com'}</div>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    {currentUser?.role || 'Admin'} Account
                  </span>
                </div>

                <div className="p-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    Profile Settings
                  </button>

                  <Link
                    to="/team"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <Users className="w-4 h-4 text-slate-500" />
                    Team Directory
                  </Link>
                </div>

                <div className="p-1 border-t border-slate-100 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Logged out of ${currentUser?.name || 'Deep Purohit'}'s session (Demo mode)`);
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
}