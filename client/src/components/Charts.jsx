import React from 'react';
import { useTasks } from '../context/TaskContext';

export function Charts() {
  const { tasks } = useTasks();

  const priorityCounts = {
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    normal: tasks.filter(t => t.priority === 'normal').length,
    low: tasks.filter(t => t.priority === 'low').length,
  };

  const stageCounts = {
    todo: tasks.filter(t => t.stage === 'todo').length,
    'in progress': tasks.filter(t => t.stage === 'in progress').length,
    completed: tasks.filter(t => t.stage === 'completed').length,
  };

  const maxVal = Math.max(1, ...Object.values(priorityCounts));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Priority Bar Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-1">Chart by Priority</h3>
        <p className="text-xs text-slate-400 mb-6">Task volume across urgency levels</p>

        <div className="space-y-4">
          {[
            { label: 'High Priority', count: priorityCounts.high, color: 'bg-red-500' },
            { label: 'Medium Priority', count: priorityCounts.medium, color: 'bg-amber-500' },
            { label: 'Normal Priority', count: priorityCounts.normal, color: 'bg-blue-500' },
            { label: 'Low Priority', count: priorityCounts.low, color: 'bg-slate-400' },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>{item.label}</span>
                <span className="font-bold">{item.count} tasks</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.round((item.count / maxVal) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-1">Stage Distribution</h3>
        <p className="text-xs text-slate-400 mb-6">Workflow distribution status</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
            <span className="text-xs text-slate-500 block">To Do</span>
            <span className="text-xl font-bold text-slate-800">{stageCounts.todo}</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
            <span className="text-xs text-blue-600 block">In Progress</span>
            <span className="text-xl font-bold text-blue-800">{stageCounts['in progress']}</span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
            <span className="text-xs text-emerald-600 block">Completed</span>
            <span className="text-xl font-bold text-emerald-800">{stageCounts.completed}</span>
          </div>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="bg-slate-400 h-full" style={{ width: `${tasks.length ? (stageCounts.todo / tasks.length) * 100 : 0}%` }} title="To Do" />
          <div className="bg-blue-500 h-full" style={{ width: `${tasks.length ? (stageCounts['in progress'] / tasks.length) * 100 : 0}%` }} title="In Progress" />
          <div className="bg-emerald-500 h-full" style={{ width: `${tasks.length ? (stageCounts.completed / tasks.length) * 100 : 0}%` }} title="Completed" />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 mt-2">
          <span>● To Do</span>
          <span>● In Progress</span>
          <span>● Completed</span>
        </div>
      </div>
    </div>
  );
}
