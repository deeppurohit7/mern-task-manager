import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TeamModal } from '../components/TeamModal';
import { UserPlus, Mail, Shield, CheckCircle, UserCheck } from 'lucide-react';

export default function Team() {
  const { users } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Team Members
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your project developers, designers, and administrators.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-all shadow-blue-500/20"
        >
          <UserPlus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      {/* Team Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 pl-6">Full Name</th>
                <th className="py-3.5 px-4">Title / Role</th>
                <th className="py-3.5 px-4">Permission</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 pr-6 text-right">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Name + Avatar */}
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${
                          user.bg || 'bg-blue-600'
                        } text-white font-bold text-xs flex items-center justify-center shadow-sm`}
                      >
                        {(user.name || 'U').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{user.name}</div>
                        <div className="text-[11px] text-slate-400">ID: {user._id || user.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="py-4 px-4 text-slate-700 font-medium">
                    {user.title || 'Full Stack Engineer'}
                  </td>

                  {/* Role */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.role === 'Admin'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {user.email}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active
                    </span>
                  </td>

                  {/* Activity */}
                  <td className="py-4 pr-6 text-right">
                    <span className="text-slate-400 text-[11px] font-medium">
                      Online today
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Team Member Modal */}
      <TeamModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
