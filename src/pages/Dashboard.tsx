import React, { useEffect, useState } from 'react';
import { 
  CheckSquare, 
  FileText, 
  Send, 
  Activity 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: CheckSquare, label: 'Active Tasks', value: '12', darkColor: 'text-accent-green' },
    { icon: FileText, label: 'Pending Invoices', value: '5', darkColor: 'text-accent-violet' },
    { icon: Send, label: 'New Requests', value: '3', darkColor: 'text-accent-pink' },
    { icon: Activity, label: 'Projects', value: '8', darkColor: 'text-accent-yellow' },
  ];

  const recentActivity = [
    { title: 'Task Updated', time: '2 hours ago', color: 'text-accent-blue' },
    { title: 'Invoice Generated', time: '3 hours ago', color: 'text-accent-violet' },
    { title: 'Request Approved', time: '4 hours ago', color: 'text-accent-green' },
  ];

  const upcomingDeadlines = [
    { title: 'Project Milestone', due: 'Due in 3 days', priority: 'High Priority', color: 'bg-red-400' },
    { title: 'Client Meeting', due: 'Due in 5 days', priority: 'Medium Priority', color: 'bg-yellow-400' },
    { title: 'Report Submission', due: 'Due in 7 days', priority: 'Low Priority', color: 'bg-green-400' },
  ];

  const chartHeight = '400px';

  const lineGraphData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#50E3C2',
        backgroundColor: 'rgba(80, 227, 194, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'New Tasks',
        data: [45, 70, 60, 75, 65, 40],
        borderColor: '#4F9BFF',
        backgroundColor: 'rgba(79, 155, 255, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'In Progress',
        data: [30, 45, 35, 50, 40, 35],
        borderColor: '#FF6B9B',
        backgroundColor: 'rgba(255, 107, 155, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineGraphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#FFFFFF' : '#000000',
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        titleColor: isDarkMode ? '#FFFFFF' : '#000000',
        bodyColor: isDarkMode ? '#FFFFFF' : '#000000',
        backgroundColor: isDarkMode ? 'rgba(45, 43, 63, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? 'rgba(180, 165, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#FFFFFF' : '#000000',
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(180, 165, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#FFFFFF' : '#000000',
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
    },
  };

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-6 sm:mb-8 dark:text-cream-white">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-muted-plum rounded-lg p-3 xs:p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs xs:text-sm text-gray-500 dark:text-soft-lavender">
                    {stat.label}
                  </p>
                  <p className="text-lg xs:text-xl sm:text-2xl font-semibold mt-1 dark:text-cream-white">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 dark:${stat.darkColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 xs:mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
        {/* Line Graph Section */}
        <div className="bg-white dark:bg-muted-plum rounded-lg p-3 xs:p-4 sm:p-6 shadow-sm lg:col-span-2 transition-all duration-300 hover:shadow-md">
          <div className="mt-4" style={{ height: chartHeight }}>
            <Line data={lineGraphData} options={lineGraphOptions} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white dark:bg-muted-plum rounded-lg p-3 xs:p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg xs:text-xl font-semibold mb-4 dark:text-cream-white">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b dark:border-deep-purple last:border-0"
              >
                <div>
                  <p className={`font-medium dark:${activity.color}`}>{activity.title}</p>
                  <p className="text-sm text-gray-500 dark:text-soft-lavender">
                    {activity.time}
                  </p>
                </div>
                <span className="text-sm text-primary-purple dark:text-cream-white">
                  View
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines Section */}
        <div className="bg-white dark:bg-muted-plum rounded-lg p-3 xs:p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg xs:text-xl font-semibold mb-4 dark:text-cream-white">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b dark:border-deep-purple last:border-0"
              >
                <div>
                  <p className="font-medium dark:text-cream-white">{deadline.title}</p>
                  <p className="text-sm text-gray-500 dark:text-soft-lavender">
                    {deadline.due}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${deadline.color} text-white`}>
                  {deadline.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}