import React, { useState } from 'react';
import { Plus, Trash2, Edit, CheckCircle } from 'lucide-react';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority']
  });

  const priorityColors = {
    high: 'bg-red-400 dark:bg-red-500 text-white',
    medium: 'bg-yellow-400 dark:bg-yellow-500 text-white',
    low: 'bg-green-400 dark:bg-green-500 text-white'
  };

  const statusColors = {
    completed: 'bg-emerald-100 dark:bg-emerald-400 text-emerald-800 dark:text-white',
    'in-progress': 'bg-blue-100 dark:bg-blue-400 text-blue-800 dark:text-white',
    todo: 'bg-gray-100 dark:bg-gray-400 text-gray-800 dark:text-white'
  };

  const addTask = () => {
    if (!newTask.title) return;
    
    const task: Task = {
      id: uuidv4(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: newTask.priority,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium' });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-cream-white">Tasks</h1>

      <div className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-cyan-300">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            onClick={addTask}
            className="flex items-center px-4 py-2 bg-primary-purple dark:bg-indigo-500 text-white rounded hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold dark:text-cream-white">{task.title}</h3>
                <p className="text-gray-600 dark:text-soft-lavender mt-2">
                  {task.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
                    {task.status.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(task.id, 'completed')}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}