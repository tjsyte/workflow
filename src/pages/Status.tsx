import React from 'react';
import { Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Status() {
  const projects = [
    {
      name: 'Website Redesign',
      progress: 75,
      status: 'in-progress',
      tasks: 12,
      completedTasks: 9,
      dueDate: '2024-03-25',
      color: 'bg-blue-500'
    },
    {
      name: 'Mobile App Development',
      progress: 45,
      status: 'in-progress',
      tasks: 20,
      completedTasks: 9,
      dueDate: '2024-04-15',
      color: 'bg-purple-500'
    },
    {
      name: 'Marketing Campaign',
      progress: 100,
      status: 'completed',
      tasks: 8,
      completedTasks: 8,
      dueDate: '2024-03-10',
      color: 'bg-green-500'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Project Status</h1>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
                  {project.name}
                  {getStatusIcon(project.status)}
                </h3>
                <p className="text-gray-600 dark:text-light-lavender">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-cyan-300">
                  Tasks: {project.completedTasks}/{project.tasks}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-pink-300">Progress</span>
                <span className="text-gray-600 dark:text-pink-300">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-deep-purple rounded-full h-2">
                <div
                  className={`${project.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary-purple dark:text-orange-400" />
                <span className="text-sm text-gray-600 dark:text-orange-300">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-purple dark:text-teal-400" />
                <span className="text-sm text-gray-600 dark:text-teal-300">
                  On Schedule
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}