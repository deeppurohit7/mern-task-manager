import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Trash2, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Trash() {
  const { trashedTasks, restoreTask, restoreAll, permanentDelete, emptyTrash } = useTasks();

  const priorityBadges = {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    normal: 'text-blue-700 bg-blue-50 border-blue-200',
    low: 'text-slate-600 bg-slate-50 border-slate-200',
  };

  const handleEmptyTrash = () => {
    if (window.confirm('Are you sure you want to permanently delete all items in trash? This action cannot be undone.')) {
      emptyTrash();
    }
  };

  const handlePermanentDelete = (id, title) => {
    if (window.confirm(`Permanently delete "${title}"?`)) {
      permanentDelete(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trash Bin
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Soft-deleted tasks remain here. You can restore them back to your sprint or permanently purge them.
          </p>
        </div>

        {trashedTasks.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={restoreAll}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Restore All
            </button>
            <button
              onClick={handleEmptyTrash}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 shadow-sm transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Empty Trash
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {trashedTasks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-slate-800 mb-1">Your trash bin is empty</h2>
          <p className="text-xs text-slate-500">
            Deleted tasks will show up here before they are permanently purged.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 pl-6">Task Title</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Previous Stage</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trashedTasks.map((task) => {
                  const taskId = task._id || task.id;
                  return (
                    <tr key={taskId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pl-6 pr-4 font-semibold text-slate-800 max-w-[280px] truncate">
                        {task.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            priorityBadges[task.priority] || priorityBadges.normal
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="capitalize font-medium text-slate-600">
                          {task.stage}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-medium">
                        {task.date || 'Recently'}
                      </td>
                      <td className="py-3.5 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => restoreTask(taskId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Restore Task"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Restore
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(taskId, task.title)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-colors"
                            title="Permanent Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
