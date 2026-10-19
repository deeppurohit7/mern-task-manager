import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { BentoStats } from '../components/BentoStats';
import { KanbanColumn } from '../components/KanbanColumn';
import { TaskModal } from '../components/TaskModal';

export function BoardView() {
  const { tasks, activeView } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalDefaultStatus, setModalDefaultStatus] = useState('backlog');

  const columns = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'in-review', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];

  const handleOpenAdd = (status = 'backlog') => {
    setEditingTask(null);
    setModalDefaultStatus(status);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
      {/* 1. Bento UI Metrics Telemetry */}
      <BentoStats />

      {/* 2. 4-Column Responsive Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={tasks.filter((t) => t.status === col.id)}
            onAddTask={() => handleOpenAdd(col.id)}
            onEditTask={handleOpenEdit}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialTask={editingTask}
          defaultStatus={modalDefaultStatus}
        />
      )}
    </div>
  );
}
