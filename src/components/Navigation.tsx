import React from 'react';
import { LayoutDashboard, FolderOpen, Plus, Briefcase } from 'lucide-react';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'add-project', label: 'Add Project', icon: Plus },
  ];

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">ProjectHub</h1>
                <p className="text-xs text-gray-400 -mt-1">Professional Project Management</p>
              </div>
            </div>
            <div className="hidden sm:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      activeView === item.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60 border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Academic Year 2024-25</p>
              <p className="text-xs text-gray-400">Final Year Projects</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}