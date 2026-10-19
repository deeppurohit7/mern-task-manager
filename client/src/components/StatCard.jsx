import React from 'react';

export function StatCard({ label, count, icon: Icon, bg, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
      <div>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
          {label}
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {count}
        </div>
        <span className="text-[11px] text-slate-400 mt-1 block">110 last month</span>
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
