import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { StatCard } from '../components/StatCard';
import { Charts } from '../components/Charts';
import { TaskDetailsModal } from '../components/TaskDetailsModal';
import { TeamModal } from '../components/TeamModal';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  ListTodo,
  UserPlus,
  ArrowRight,
  Calendar,
  ListChecks,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { tasks, stats, users } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  const priorityBadges = {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    normal: 'text-blue-700 bg-blue-50 border-blue-200',
    low: 'text-slate-600 bg-slate-50 border-slate-200',
  };

  const stageBadges = {
    'todo': 'bg-slate-100 text-slate-700 border-slate-200',
    'in progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const recentTasks = tasks.slice(0, 7);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Overview of team velocity, sprint tasks, and progress tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTeamModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4 text-slate-500" />
            Add Team Member
          </button>
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-all"
          >
            Manage Tasks
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Total Tasks"
          count={stats.total}
          icon={LayoutDashboard}
          bg="bg-blue-50"
          color="text-blue-600"
        />
        <StatCard
          label="Completed"
          count={stats.completed}
          icon={CheckCircle2}
          bg="bg-emerald-50"
          color="text-emerald-600"
        />
        <StatCard
          label="In Progress"
          count={stats.inProgress}
          icon={Clock}
          bg="bg-amber-50"
          color="text-amber-600"
        />
        <StatCard
          label="To Do"
          count={stats.todo}
          icon={ListTodo}
          bg="bg-purple-50"
          color="text-purple-600"
        />
      </div>

      {/* Priority & Stage Analytics Charts */}
      <Charts />

      {/* 2-Column Split: Recent Tasks & Team Members */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3): Recent Tasks Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Tasks</h2>
              <p className="text-xs text-slate-400">Latest active sprint deliverables</p>
            </div>
            <Link
              to="/tasks"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Task Title</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Stage</th>
                  <th className="pb-3">Team</th>
                  <th className="pb-3">Subtasks</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTasks.map((task) => {
                  const taskTeam = users.filter((u) => (task.team || []).includes(u._id || u.id));
                  const subtasks = task.subtasks || [];
                  const completedSubtasks = subtasks.filter((s) => s.isCompleted).length;

                  return (
                    <tr
                      key={task._id || task.id}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                      onClick={() => setSelectedTask(task)}
                    >
                      <td className="py-3 pl-2 pr-4 font-semibold text-slate-800 max-w-[220px] truncate group-hover:text-blue-600">
                        {task.title}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            priorityBadges[task.priority] || priorityBadges.normal
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize border ${
                            stageBadges[task.stage] || stageBadges.todo
                          }`}
                        >
                          {task.stage}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {taskTeam.slice(0, 3).map((u) => (
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
                      <td className="py-3 pr-4 text-slate-500">
                        {subtasks.length > 0 ? (
                          <span className="inline-flex items-center gap-1 font-medium">
                            <ListChecks className="w-3.5 h-3.5 text-blue-500" />
                            {completedSubtasks}/{subtasks.length}
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="py-3 pr-2 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTask(task);
                          }}
                          className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1/3): Team Members Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Team Members</h2>
                <p className="text-xs text-slate-400">Assigned engineers & admins</p>
              </div>
              <Link
                to="/team"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                All ({users.length})
              </Link>
            </div>

            <div className="space-y-3.5">
              {users.slice(0, 6).map((user) => (
                <div
                  key={user._id || user.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${
                        user.bg || 'bg-blue-600'
                      } text-white font-bold text-xs flex items-center justify-center shadow-sm`}
                    >
                      {(user.name || 'U').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 leading-tight">
                        {user.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {user.title || user.role}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      user.role === 'Admin'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setTeamModalOpen(true)}
            className="w-full mt-6 py-2.5 px-4 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            + Add New Member
          </button>
        </div>
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />

      {/* Add Team Modal */}
      <TeamModal
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
      />
    </div>
  );
}
