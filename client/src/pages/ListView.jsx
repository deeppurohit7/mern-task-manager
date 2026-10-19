import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { BentoStats } from '../components/BentoStats';
import { TaskModal } from '../components/TaskModal';
import { Calendar, Trash2, Edit2, ArrowRight } from 'lucide-react';

export function ListView() {
  const { tasks, updateTaskStatus, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityStyles = {
    urgent: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    high: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    medium: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    low: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
  };

  const statusLabels = {
    backlog: 'Backlog',
    'in-progress': 'In Progress',
    'in-review': 'In Review',
    done: 'Done',
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
      <BentoStats />

      <div className="bg-obsidian-900 border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-obsidian-950/40 text-xs font-mono text-slate-400">
          <span>{tasks.length} Active Tasks</span>
          <span>Ordered by execution priority</span>
        </div>

        <div className="divide-y divide-white/5">
          {tasks.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs font-mono">
              No tasks found matching criteria.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id || task.id}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold border ${
                      priorityStyles[task.priority] || priorityStyles.medium
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs font-mono text-slate-500">• {statusLabels[task.status]}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-white truncate">{task.title}</h4>
                  {task.description && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">{task.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 text-xs font-mono">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{task.dueDate || 'No date'}</span>
                  </span>

                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task._id || task.id, e.target.value)}
                    className="bg-obsidian-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="in-progress">In Progress</option>
                    <option value="in-review">In Review</option>
                    <option value="done">Done</option>
                  </select>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-1.5 rounded text-slate-400 hover:text-white"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id || task.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialTask={editingTask}
        />
      )}
    </div>
  );
}
