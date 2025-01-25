import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Send, 
  Activity,
  Lightbulb,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', darkColor: 'text-accent-blue' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks', darkColor: 'text-accent-green' },
    { to: '/invoices', icon: FileText, label: 'Invoices', darkColor: 'text-accent-violet' },
    { to: '/requests', icon: Send, label: 'Requests', darkColor: 'text-accent-pink' },
    { to: '/status', icon: Activity, label: 'Status', darkColor: 'text-accent-yellow' },
    { to: '/automation', icon: Lightbulb, label: 'Automation', darkColor: 'text-accent-orange' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-white dark:bg-deep-purple 
        border-r border-gray-200 dark:border-muted-plum z-50 
        transform transition-transform duration-200 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-purple dark:text-soft-lavender">
            Workflow
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-muted-plum"
          >
            <X className="w-5 h-5 dark:text-cream-white" />
          </button>
        </div>
        
        <nav className="flex-1 mt-8">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`flex items-center px-6 py-3 text-gray-700 dark:text-cream-white hover:bg-gray-100 dark:hover:bg-muted-plum ${
                  isActive ? 'bg-gray-100 dark:bg-muted-plum' : ''
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${theme === 'dark' ? link.darkColor : ''}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-muted-plum">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-soft-lavender">
              Created by tjsyte
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-muted-plum"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-accent-yellow" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}