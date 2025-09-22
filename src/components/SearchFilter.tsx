import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  techFilter: string;
  onTechFilterChange: (tech: string) => void;
  availableTechs: string[];
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  techFilter,
  onTechFilterChange,
  availableTechs,
}: SearchFilterProps) {
  return (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-8 shadow-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white tracking-tight">Advanced Search & Filtering</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="planning">Planning</option>
          <option value="on-hold">On Hold</option>
        </select>

        <select
          value={techFilter}
          onChange={(e) => onTechFilterChange(e.target.value)}
          className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
        >
          <option value="">All Technologies</option>
          {availableTechs.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}