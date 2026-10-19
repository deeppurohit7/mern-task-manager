import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialTasks, initialUsers } from '../data/seedData';

const TaskContext = createContext();
const TASKS_STORAGE = 'ttp_tasks_store_v1';
const USERS_STORAGE = 'ttp_users_store_v1';

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE);
      return stored ? JSON.parse(stored) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE);
      return stored ? JSON.parse(stored) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  const [currentUser] = useState({
    name: 'Deep Purohit',
    role: 'Admin',
    email: 'deep@taskmanager.com',
    title: 'Administrator & Lead Developer',
    avatar: 'DP',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE, JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE, JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  // Attempt backend API fetch
  useEffect(() => {
    const syncApi = async () => {
      try {
        const res = await fetch('/api/tasks');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setTasks(data);
        }
      } catch (e) {}
    };
    syncApi();
  }, []);

  // Actions
  const createTask = (taskData) => {
    const newTask = {
      ...taskData,
      _id: `t-${Date.now()}`,
      id: `t-${Date.now()}`,
      isTrashed: false,
      subtasks: taskData.subtasks || [],
      assets: taskData.assets || [],
      team: taskData.team || ['u-1'],
    };
    setTasks((prev) => [newTask, ...prev]);

    // Backend sync
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    }).catch(() => {});
  };

  const updateTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === id || t.id === id ? { ...t, ...updatedData } : t))
    );

    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    }).catch(() => {});
  };

  const duplicateTask = (task) => {
    const dup = {
      ...task,
      _id: `t-${Date.now()}`,
      id: `t-${Date.now()}`,
      title: `${task.title} (Copy)`,
    };
    setTasks((prev) => [dup, ...prev]);
  };

  const moveToTrash = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === id || t.id === id ? { ...t, isTrashed: true } : t))
    );
    fetch(`/api/tasks/${id}/trash`, { method: 'PATCH' }).catch(() => {});
  };

  const restoreTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === id || t.id === id ? { ...t, isTrashed: false } : t))
    );
    fetch(`/api/tasks/${id}/restore`, { method: 'PATCH' }).catch(() => {});
  };

  const restoreAll = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, isTrashed: false })));
  };

  const permanentDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id && t.id !== id));
    fetch(`/api/tasks/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const emptyTrash = () => {
    setTasks((prev) => prev.filter((t) => !t.isTrashed));
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t._id === taskId || t.id === taskId) {
          const updatedSubtasks = (t.subtasks || []).map((st) =>
            st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
          );
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      })
    );
  };

  const addTeamMember = (memberData) => {
    const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-rose-600'];
    const newMember = {
      ...memberData,
      _id: `u-${Date.now()}`,
      id: `u-${Date.now()}`,
      isActive: true,
      bg: colors[users.length % colors.length]
    };
    setUsers((prev) => [...prev, newMember]);
  };

  // Active (non-trashed) vs Trashed
  const activeTasks = useMemo(() => tasks.filter((t) => !t.isTrashed), [tasks]);
  const trashedTasks = useMemo(() => tasks.filter((t) => t.isTrashed), [tasks]);

  // Telemetry Calculations for 4 Summary Cards
  const stats = useMemo(() => {
    const total = activeTasks.length;
    const completed = activeTasks.filter((t) => t.stage === 'completed').length;
    const inProgress = activeTasks.filter((t) => t.stage === 'in progress').length;
    const todo = activeTasks.filter((t) => t.stage === 'todo').length;

    return { total, completed, inProgress, todo };
  }, [activeTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks: activeTasks,
        allTasks: tasks,
        trashedTasks,
        users,
        currentUser,
        stats,
        searchQuery,
        setSearchQuery,
        selectedPriority,
        setSelectedPriority,
        sidebarOpen,
        setSidebarOpen,
        createTask,
        updateTask,
        duplicateTask,
        moveToTrash,
        restoreTask,
        restoreAll,
        permanentDelete,
        emptyTrash,
        toggleSubtask,
        addTeamMember
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
}
