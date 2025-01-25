import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Invoices from './pages/Invoices';
import Requests from './pages/Requests';
import Status from './pages/Status';
import Automation from './pages/Automation';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-deep-purple text-gray-900 dark:text-cream-white">
          {/* Mobile menu button */}
          <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-deep-purple border-b border-gray-200 dark:border-muted-plum z-40 lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-muted-plum"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/status" element={<Status />} />
              <Route path="/automation" element={<Automation />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;