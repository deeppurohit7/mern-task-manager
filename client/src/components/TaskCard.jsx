import React from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskDialog } from './TaskDialog';
import { Calendar, ListChecks } from 'lucide-react';

export function TaskCard({ task, onOpen, onEdit }) {
  const { users } = useTasks();

  const priorityBadges = {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    normal: 'text-blue-700 bg-blue-50 border-blue-200',
    low: 'text-slate-600 bg-slate-50 border-slate-200',
  };

  const subtasks = task.subtasks || [];
  const completedCount = subtasks.filter(s => s.isCompleted).length;
  const teamUsers = users.filter(u => (task.team || []).includes(u._id || u.id));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Priority Pill & 3-dots Menu */}
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${priorityBadges[task.priority] || priorityBadges.normal}`}>
          {task.priority} Priority
        </span>

        <TaskDialog task={task} onOpen={onOpen} onEdit={onEdit} />
      </div>

      {/* Task Title */}
      <h4
        onClick={() => onOpen(task)}
        className="text-sm font-bold text-slate-800 hover:text-blue-600 cursor-pointer line-clamp-2 mb-2 leading-snug"
      >
        {task.title}
      </h4>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
        <Calendar className="w-3.5 h-3.5" />
        <span>{task.date}</span>
      </div>

      {/* Subtasks Progress */}
      {subtasks.length > 0 && (
        <div className="pt-2.5 border-t border-slate-100 mb-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center gap-1">
              <ListChecks className="w-3.5 h-3.5 text-blue-600" />
              <span>Subtasks</span>
            </span>
            <span>{completedCount}/{subtasks.length}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((completedCount / subtasks.length) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Team Avatars Stack */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center -space-x-1.5">
          {teamUsers.slice(0, 4).map((u) => (
            <div
              key={u.id || u._id}
              className={`w-6 h-6 rounded-full text-white font-bold text-[10px] flex items-center justify-center border-2 border-white ${u.bg || 'bg-blue-600'}`}
              title={u.name}
            >
              {u.name.slice(0, 1)}
            </div>
          ))}
          {teamUsers.length > 4 && (
            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center border-2 border-white">
              +{teamUsers.length - 4}
            </div>
          )}
        </div>

        <span className="text-[11px] font-semibold text-slate-400 uppercase">
          {task.stage}
        </span>
      </div>
    </div>
  );
}
