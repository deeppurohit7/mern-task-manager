import React from 'react';
import { useTasks } from '../context/TaskContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, Activity } from 'lucide-react';

export function BentoStats() {
  const { stats } = useTasks();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {/* 1. Velocity Active */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-obsidian-900 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">In Progress</span>
          <Activity className="w-3.5 h-3.5 text-accent-blue" />
        </div>
        <div className="text-2xl font-bold font-mono text-white mt-1">
          {stats.inProgress}
        </div>
        <span className="text-[10px] font-mono text-slate-500 mt-1">Active execution cycle</span>
      </motion.div>

      {/* 2. Total Backlog */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-obsidian-900 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Queue</span>
          <Clock className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold font-mono text-slate-200 mt-1">
          {stats.backlog + stats.inReview}
        </div>
        <span className="text-[10px] font-mono text-slate-500 mt-1">{stats.backlog} queued, {stats.inReview} in review</span>
      </motion.div>

      {/* 3. Overdue Risks */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-obsidian-900 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Overdue Alerts</span>
          <AlertTriangle className="w-3.5 h-3.5 text-accent-rose" />
        </div>
        <div className={`text-2xl font-bold font-mono mt-1 ${stats.overdue > 0 ? 'text-accent-rose' : 'text-slate-400'}`}>
          {stats.overdue}
        </div>
        <span className="text-[10px] font-mono text-slate-500 mt-1">Past targeted SLA date</span>
      </motion.div>

      {/* 4. Completion Rate */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-obsidian-900 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Sprint Velocity</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
        </div>
        <div className="text-2xl font-bold font-mono text-accent-emerald mt-1">
          {stats.completionRate}%
        </div>
        <span className="text-[10px] font-mono text-slate-500 mt-1">{stats.done} of {stats.total} tasks completed</span>
      </motion.div>
    </div>
  );
}
