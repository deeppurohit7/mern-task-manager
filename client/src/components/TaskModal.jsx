import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { X, Plus, Trash2 } from 'lucide-react';

export function TaskModal({ isOpen, onClose, initialTask = null, defaultStage = 'todo' }) {
  const { createTask, updateTask, users } = useTasks();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [stage, setStage] = useState(defaultStage);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTeam, setSelectedTeam] = useState(['u-1']);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setPriority(initialTask.priority || 'medium');
      setStage(initialTask.stage || 'todo');
      setDate(initialTask.date || new Date().toISOString().split('T')[0]);
      setSelectedTeam(initialTask.team || ['u-1']);
      setSubtasks(initialTask.subtasks || []);
    } else {
      setTitle('');
      setPriority('medium');
      setStage(defaultStage);
      setDate(new Date().toISOString().split('T')[0]);
      setSelectedTeam(['u-1']);
      setSubtasks([]);
    }
  }, [initialTask, defaultStage, isOpen]);

  const handleToggleUser = (userId) => {
    setSelectedTeam(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!subtaskInput.trim()) return;
    setSubtasks([
      ...subtasks,
      { id: `st-${Date.now()}`, title: subtaskInput.trim(), date, tag: 'General', isCompleted: false }
    ]);
    setSubtaskInput('');
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskPayload = {
      title: title.trim(),
      priority,
      stage,
      date,
      team: selectedTeam,
      subtasks,
      assets: []
    };

    if (initialTask) {
      updateTask(initialTask._id || initialTask.id, taskPayload);
    } else {
      createTask(taskPayload);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">
            {initialTask ? 'Update Task' : 'Add New Task'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Implement User Role-Based Access Control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
              required
            />
          </div>

          {/* Assigned Team Members (Multi-select) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Assign Team Members
            </label>
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-32 overflow-y-auto">
              {users.map((u) => {
                const isSelected = selectedTeam.includes(u._id || u.id);
                return (
                  <label key={u._id || u.id} className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleUser(u._id || u.id)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${u.bg || 'bg-blue-600'}`}>
                      {u.name.slice(0, 1)}
                    </span>
                    <span className="truncate text-slate-700">{u.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Stage, Date & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="todo">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Task Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Subtasks Builder */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Subtasks Checklist ({subtasks.length})
            </label>
            <div className="space-y-1.5 mb-2.5">
              {subtasks.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span className="text-slate-700">{s.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(s.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter subtask title..."
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
            >
              {initialTask ? 'Update Task' : 'Submit Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
