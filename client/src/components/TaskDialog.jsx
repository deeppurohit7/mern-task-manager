import React, { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { MoreHorizontal, Eye, Edit2, Copy, Trash2 } from 'lucide-react';

export function TaskDialog({ task, onOpen, onEdit }) {
  const [open, setOpen] = useState(false);
  const { duplicateTask, moveToTrash } = useTasks();
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-6 z-20 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 text-xs text-slate-700">
          <button
            onClick={() => { setOpen(false); onOpen(task); }}
            className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-left"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Open Task</span>
          </button>
          <button
            onClick={() => { setOpen(false); onEdit(task); }}
            className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-left"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => { setOpen(false); duplicateTask(task); }}
            className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-left"
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>Duplicate</span>
          </button>
          <div className="border-t border-slate-100 my-1"></div>
          <button
            onClick={() => { setOpen(false); moveToTrash(task._id || task.id); }}
            className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-red-50 text-red-600 text-left"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
            <span>Move to Trash</span>
          </button>
        </div>
      )}
    </div>
  );
}
