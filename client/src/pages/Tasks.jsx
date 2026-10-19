import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { TaskDetailsModal } from '../components/TaskDetailsModal';
import { TaskDialog } from '../components/TaskDialog';
import {
  LayoutGrid,
  List,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  ListTodo,
  Calendar,
  ListChecks,
  AlertCircle
} from 'lucide-react';

export default function Tasks({ filterStage = null, title = 'Tasks' }) {
  const { tasks, users, searchQuery, selectedPriority, setSelectedPriority } = useTasks();

  const [viewMode, setViewMode] = useState('board'); // 'board' | 'list'
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalDefaultStage, setModalDefaultStage] = useState('todo');

  // Filter tasks based on stage, search, priority
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Stage filter
      if (filterStage && task.stage !== filterStage) return false;

      // Priority filter
      if (selectedPriority !== 'all' && task.priority !== selectedPriority) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesDesc = (task.description || '').toLowerCase().includes(q);
        const matchesPriority = task.priority.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesPriority) return false;
      }

      return true;
    });
  }, [tasks, filterStage, selectedPriority, searchQuery]);

  // Stage groups for Board View
  const todoTasks = filteredTasks.filter((t) => t.stage === 'todo');
  const inProgressTasks = filteredTasks.filter((t) => t.stage === 'in progress');
  const completedTasks = filteredTasks.filter((t) => t.stage === 'completed');

  const priorityBadges = {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    normal: 'text-blue-700 bg-blue-50 border-blue-200',
    low: 'text-slate-600 bg-slate-50 border-slate-200',
  };

  const handleCreateInStage = (stage) => {
    setModalDefaultStage(stage);
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found in sprint backlog.
          </p>
        </div>

        <button
          onClick={() => {
            setModalDefaultStage('todo');
            setEditingTask(null);
            setTaskModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-all shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Control Bar: View Switcher & Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Board vs List Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode('board')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'board'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Board View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List View
          </button>
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Priority:
          </span>
          {['all', 'high', 'medium', 'normal', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize transition-all ${
                selectedPriority === p
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* View Content */}
      {viewMode === 'board' ? (
        /* Board View: 3 Columns */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TO DO Column */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  To Do
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                  {todoTasks.length}
                </span>
              </div>
              <button
                onClick={() => handleCreateInStage('todo')}
                className="p-1 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
                title="Add task to To Do"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {todoTasks.length === 0 ? (
                <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400">
                  No tasks in To Do
                </div>
              ) : (
                todoTasks.map((task) => (
                  <TaskCard
                    key={task._id || task.id}
                    task={task}
                    onOpen={() => setSelectedTask(task)}
                    onEdit={() => handleEditTask(task)}
                  />
                ))
              )}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="bg-blue-50/40 border border-blue-200/70 rounded-2xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-200/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  In Progress
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-blue-700 border border-blue-200">
                  {inProgressTasks.length}
                </span>
              </div>
              <button
                onClick={() => handleCreateInStage('in progress')}
                className="p-1 text-blue-500 hover:text-blue-700 hover:bg-white rounded-lg transition-colors"
                title="Add task to In Progress"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {inProgressTasks.length === 0 ? (
                <div className="h-32 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center text-xs text-blue-400">
                  No tasks In Progress
                </div>
              ) : (
                inProgressTasks.map((task) => (
                  <TaskCard
                    key={task._id || task.id}
                    task={task}
                    onOpen={() => setSelectedTask(task)}
                    onEdit={() => handleEditTask(task)}
                  />
                ))
              )}
            </div>
          </div>

          {/* COMPLETED Column */}
          <div className="bg-emerald-50/40 border border-emerald-200/70 rounded-2xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Completed
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-emerald-700 border border-emerald-200">
                  {completedTasks.length}
                </span>
              </div>
              <button
                onClick={() => handleCreateInStage('completed')}
                className="p-1 text-emerald-500 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors"
                title="Add task to Completed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {completedTasks.length === 0 ? (
                <div className="h-32 border-2 border-dashed border-emerald-200 rounded-xl flex items-center justify-center text-xs text-emerald-400">
                  No completed tasks yet
                </div>
              ) : (
                completedTasks.map((task) => (
                  <TaskCard
                    key={task._id || task.id}
                    task={task}
                    onOpen={() => setSelectedTask(task)}
                    onEdit={() => handleEditTask(task)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* List View: Structured Table */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 pl-6">Task Title</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">Created At</th>
                  <th className="py-3.5 px-4">Team</th>
                  <th className="py-3.5 px-4">Subtasks</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No tasks match the selected filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => {
                    const taskTeam = users.filter((u) =>
                      (task.team || []).includes(u._id || u.id)
                    );
                    const subtasks = task.subtasks || [];
                    const completedSubtasks = subtasks.filter((s) => s.isCompleted).length;

                    return (
                      <tr
                        key={task._id || task.id}
                        className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                        onClick={() => setSelectedTask(task)}
                      >
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-slate-800 max-w-[260px] truncate group-hover:text-blue-600">
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
                          {task.date || 'Today'}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex -space-x-1.5 overflow-hidden">
                            {taskTeam.slice(0, 4).map((u) => (
                              <div
                                key={u._id || u.id}
                                title={u.name}
                                className={`w-6 h-6 rounded-full ${
                                  u.bg || 'bg-blue-600'
                                } text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-white`}
                              >
                                {(u.name || 'U').substring(0, 2).toUpperCase()}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {subtasks.length > 0 ? (
                            <span className="inline-flex items-center gap-1">
                              <ListChecks className="w-3.5 h-3.5 text-blue-500" />
                              {completedSubtasks}/{subtasks.length}
                            </span>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                        <td
                          className="py-3.5 pr-6 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <TaskDialog
                            task={task}
                            onOpen={() => setSelectedTask(task)}
                            onEdit={() => handleEditTask(task)}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Task Create / Edit Modal */}
      <TaskModal
        isOpen={taskModalOpen}
        initialTask={editingTask}
        defaultStage={modalDefaultStage}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(null);
        }}
      />

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
