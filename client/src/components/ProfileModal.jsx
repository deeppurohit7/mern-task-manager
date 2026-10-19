import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { X, Shield, Mail, Briefcase, Building, CheckCircle2, User, Save } from 'lucide-react';

export function ProfileModal({ isOpen, onClose }) {
  const { currentUser, updateProfile, toggleRole, tasks } = useTasks();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [title, setTitle] = useState(currentUser.title);
  const [department, setDepartment] = useState(currentUser.department || 'Engineering');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setTitle(currentUser.title);
      setDepartment(currentUser.department || 'Engineering');
      setSavedSuccess(false);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const assignedTasksCount = tasks.filter((t) =>
    (t.team || []).includes(currentUser.id || 'u-1')
  ).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      title: title.trim(),
      department: department.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              {currentUser.avatar}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">User Profile Settings</h2>
              <p className="text-xs text-slate-400">Manage account information & role</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Current Role: {currentUser.role}</span>
                <span className="text-[11px] text-slate-500 block">
                  {currentUser.role === 'Admin' ? 'Full administrative access' : 'Standard member access'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleRole}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors shadow-sm"
            >
              Switch to {currentUser.role === 'Admin' ? 'User' : 'Admin'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[11px] text-slate-400 block font-medium">Assigned Tasks</span>
              <span className="text-lg font-bold text-slate-800">{assignedTasksCount} sprint tasks</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[11px] text-slate-400 block font-medium">Account Status</span>
              <span className="text-lg font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}