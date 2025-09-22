import React from 'react';
import { Calendar, Users, Code, Edit, Trash2 } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  completed: 'bg-emerald-500',
  'in-progress': 'bg-blue-500',
  planning: 'bg-yellow-500',
  'on-hold': 'bg-red-500',
};

const statusLabels = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planning: 'Planning',
  'on-hold': 'On Hold',
};

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight leading-tight">{project.title}</h3>
          <div className="flex items-center space-x-2">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg ${
                statusColors[project.status]
              }`}
            >
              {statusLabels[project.status]}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="p-3 text-gray-400 hover:text-blue-400 hover:bg-gray-800/60 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-400/30"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-3 text-gray-400 hover:text-red-400 hover:bg-gray-800/60 rounded-xl transition-all duration-200 border border-transparent hover:border-red-400/30"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">{project.description}</p>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <Users className="w-5 h-5 text-indigo-400" />
          <span>{project.members.join(', ')}</span>
        </div>

        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <Code className="w-5 h-5 text-purple-400" />
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800/60 rounded-lg text-xs font-medium border border-gray-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <span>
            Started {formatDate(project.startDate)}
            {project.endDate && ` • Ended ${formatDate(project.endDate)}`}
          </span>
        </div>
      </div>
    </div>
  );
}