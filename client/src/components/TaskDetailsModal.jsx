import React from 'react';
import { useTasks } from '../context/TaskContext';
import { X, Calendar, CheckSquare, Users, FileText } from 'lucide-react';

export function TaskDetailsModal({ task, isOpen, onClose }) {
  const { users, toggleSubtask } = useTasks();
  if (!isOpen || !task) return null;

  const teamUsers = users.filter(u => (task.team || []).includes(u._id || u.id));
  const subtasks = task.subtasks || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              {task.stage}
            </span>
            <span className="text-xs font-medium text-slate-500">• {task.priority} Priority</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug mb-2">{task.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created / Due Date: {task.date}</span>
            </div>
          </div>

          {/* Assigned Team */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Assigned Team ({teamUsers.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {teamUsers.map((u) => (
                <div key={u._id || u.id} className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 border border-slate-200 rounded-full text-xs">
                  <div className={`w-6 h-6 rounded-full text-white font-bold text-[10px] flex items-center justify-center ${u.bg || 'bg-blue-600'}`}>
                    {u.name.slice(0, 1)}
                  </div>
                  <span className="font-medium text-slate-700">{u.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Subtasks Checklist */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <span>Subtasks & Deliverables ({subtasks.length})</span>
            </div>

            {subtasks.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-400">
                No subtasks attached to this item.
              </div>
            ) : (
              <div className="space-y-2">
                {subtasks.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => toggleSubtask(task._id || task.id, st.id)}
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={Boolean(st.isCompleted)}
                        onChange={() => {}}
                        className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className={`text-xs font-medium ${st.isCompleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {st.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{st.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
