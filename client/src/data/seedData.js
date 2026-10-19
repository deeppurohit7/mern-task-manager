export const initialUsers = [
  { _id: 'u-1', id: 'u-1', name: 'Deep Purohit', title: 'Administrator & Lead Developer', role: 'Admin', email: 'deep@taskmanager.com', isActive: true, bg: 'bg-blue-600' },
  { _id: 'u-2', id: 'u-2', name: 'Arjun Verma', title: 'Backend Engineer', role: 'User', email: 'arjun@taskmanager.com', isActive: true, bg: 'bg-emerald-600' },
  { _id: 'u-3', id: 'u-3', name: 'Priya Sharma', title: 'Frontend Developer', role: 'User', email: 'priya@taskmanager.com', isActive: true, bg: 'bg-amber-600' },
  { _id: 'u-4', id: 'u-4', name: 'Rohan Patel', title: 'QA & Automation', role: 'User', email: 'rohan@taskmanager.com', isActive: true, bg: 'bg-purple-600' },
  { _id: 'u-5', id: 'u-5', name: 'Sneha Rao', title: 'UI/UX Designer', role: 'User', email: 'sneha@taskmanager.com', isActive: true, bg: 'bg-rose-600' },
];

export const initialTasks = [
  {
    _id: 't-1',
    id: 't-1',
    title: 'Design and Deploy Authentication Workflow',
    date: '2026-10-25',
    priority: 'high',
    stage: 'todo',
    team: ['u-1', 'u-2'],
    assets: ['auth-wireframe.png', 'token-spec.pdf'],
    isTrashed: false,
    subtasks: [
      { id: 'st-1', title: 'Setup JWT middleware in Express', date: '2026-10-20', tag: 'Backend', isCompleted: true },
      { id: 'st-2', title: 'Implement bcrypt salt rounds', date: '2026-10-21', tag: 'Security', isCompleted: false },
      { id: 'st-3', title: 'Create ProtectedRoute wrapper in React', date: '2026-10-22', tag: 'Frontend', isCompleted: false },
    ]
  },
  {
    _id: 't-2',
    id: 't-2',
    title: 'Migrate MongoDB Database Clusters & Indexes',
    date: '2026-10-22',
    priority: 'medium',
    stage: 'in progress',
    team: ['u-1', 'u-4'],
    assets: ['migration-plan.sql'],
    isTrashed: false,
    subtasks: [
      { id: 'st-4', title: 'Benchmark query performance in staging', date: '2026-10-18', tag: 'Database', isCompleted: true },
      { id: 'st-5', title: 'Add compound index on { stage: 1, priority: 1 }', date: '2026-10-19', tag: 'Optimization', isCompleted: true },
    ]
  },
  {
    _id: 't-3',
    id: 't-3',
    title: 'Build Team Member Assignment Drawer & Modals',
    date: '2026-10-28',
    priority: 'normal',
    stage: 'in progress',
    team: ['u-3', 'u-5'],
    assets: ['figma-spec-v3.png'],
    isTrashed: false,
    subtasks: [
      { id: 'st-6', title: 'Multi-select team checkbox dropdown', date: '2026-10-22', tag: 'UI', isCompleted: true },
      { id: 'st-7', title: 'Display avatar stack on task cards', date: '2026-10-23', tag: 'Component', isCompleted: false },
    ]
  },
  {
    _id: 't-4',
    id: 't-4',
    title: 'Setup Automated CI/CD Pipeline & GitHub Actions',
    date: '2026-10-16',
    priority: 'high',
    stage: 'completed',
    team: ['u-1', 'u-2'],
    assets: ['ci-config.yml'],
    isTrashed: false,
    subtasks: [
      { id: 'st-8', title: 'Write unit tests for task controllers', date: '2026-10-14', tag: 'Testing', isCompleted: true },
      { id: 'st-9', title: 'Configure auto-deploy on main branch merge', date: '2026-10-15', tag: 'DevOps', isCompleted: true },
    ]
  },
  {
    _id: 't-5',
    id: 't-5',
    title: 'Refactor Legacy API Endpoints and Headers',
    date: '2026-10-12',
    priority: 'low',
    stage: 'completed',
    team: ['u-2'],
    assets: [],
    isTrashed: false,
    subtasks: [
      { id: 'st-10', title: 'Audit deprecated req.param calls', date: '2026-10-11', tag: 'Cleanup', isCompleted: true },
    ]
  },
  {
    _id: 't-6',
    id: 't-6',
    title: 'Archived Redundant Task Template',
    date: '2026-10-05',
    priority: 'low',
    stage: 'todo',
    team: ['u-4'],
    assets: [],
    isTrashed: true, // In Trash
    subtasks: []
  }
];
