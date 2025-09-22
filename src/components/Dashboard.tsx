import React from 'react';
import { Project, ProjectStats } from '../types/project';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FolderOpen,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  projects: Project[];
}

export default function Dashboard({ projects }: DashboardProps) {
  const stats: ProjectStats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    planning: projects.filter(p => p.status === 'planning').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
  };

  const recentProjects = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.total,
      icon: FolderOpen,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Planning',
      value: stats.planning,
      icon: Calendar,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              Project Management Dashboard
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Streamline your academic project workflow with comprehensive tracking, 
              team collaboration tools, and professional presentation capabilities.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-4xl font-bold text-white mb-1">{completionRate}%</div>
              <div className="text-sm text-gray-300 font-medium">Success Rate</div>
            </div>
            <TrendingUp className="w-16 h-16 text-emerald-400 drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-semibold uppercase tracking-wide">{stat.title}</p>
                  <p className="text-4xl font-bold text-white mt-3">{stat.value}</p>
                </div>
                <Icon className={`w-10 h-10 ${stat.color} drop-shadow-lg`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">Recent Activity</h2>
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Last Updated</span>
          </div>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/30">
              <FolderOpen className="w-20 h-20 text-gray-500 mx-auto mb-6" />
              <p className="text-gray-300 text-xl font-semibold mb-2">No projects yet</p>
              <p className="text-gray-400 text-base">Create your first project to get started</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-6 bg-gray-800/40 rounded-xl hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    project.status === 'completed' ? 'bg-emerald-500' :
                    project.status === 'in-progress' ? 'bg-blue-500' :
                    project.status === 'planning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    <p className="text-gray-300 text-sm">
                      {project.members.length} members • {project.techStack.length} technologies
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{project.members.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Distribution */}
      <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Project Status Overview</h2>
        <div className="space-y-6">
          {[
            { label: 'Completed', count: stats.completed, color: 'bg-emerald-500', total: stats.total },
            { label: 'In Progress', count: stats.inProgress, color: 'bg-blue-500', total: stats.total },
            { label: 'Planning', count: stats.planning, color: 'bg-yellow-500', total: stats.total },
            { label: 'On Hold', count: stats.onHold, color: 'bg-red-500', total: stats.total },
          ].map((item) => {
            const percentage = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
            return (
              <div key={item.label} className="flex items-center space-x-4">
                <div className="w-24 text-gray-300 text-sm font-semibold">{item.label}</div>
                <div className="flex-1 bg-gray-800/60 rounded-full h-4 overflow-hidden border border-gray-700/50">
                  <div
                    className={`h-full ${item.color} transition-all duration-1000 ease-out shadow-inner`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-16 text-white text-base font-bold text-right">{item.count}</div>
                <div className="w-12 text-gray-400 text-sm text-right">{Math.round(percentage)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}