import React from 'react';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function KanbanColumn({ column, tasks, onAddTask, onEditTask }) {
  const statusColors = {
    backlog: 'bg-slate-500',
    'in-progress': 'bg-accent-blue',
    'in-review': 'bg-accent-purple',
    done: 'bg-accent-emerald',
  };

  return (
    <div className="bg-obsidian-900/60 border border-white/10 rounded-2xl p-4 flex flex-col h-[calc(100vh-230px)] min-h-[500px]">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusColors[column.id] || 'bg-slate-400'}`} />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            {column.title}
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-obsidian-950 rounded border border-white/10 text-slate-400">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddTask(column.id)}
          className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title={`Add task to ${column.title}`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cards List with Scroll */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {tasks.length === 0 ? (
          <div className="h-32 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-600 text-xs font-mono">
            Empty column
          </div>
        ) : (
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskCard key={task._id || task.id} task={task} onEdit={onEditTask} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
