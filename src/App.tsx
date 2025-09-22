import React, { useState, useEffect } from 'react';
import { Project } from './types/project';
import { mockProjects } from './data/mockData';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load mock data on initial render
    setProjects(mockProjects);
  }, []);

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects(prev => [...prev, newProject]);
    setActiveView('projects');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setActiveView('add-project');
  };

  const handleUpdateProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProject) {
      const updatedProject: Project = {
        ...projectData,
        id: editingProject.id,
        createdAt: editingProject.createdAt,
        updatedAt: new Date().toISOString(),
      };

      setProjects(prev => 
        prev.map(p => p.id === editingProject.id ? updatedProject : p)
      );
      setEditingProject(null);
      setActiveView('projects');
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setActiveView('projects');
  };

  const handleViewChange = (view: string) => {
    if (view !== 'add-project') {
      setEditingProject(null);
    }
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard projects={projects} />;
      case 'projects':
        return (
          <ProjectList
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        );
      case 'add-project':
        return (
          <ProjectForm
            project={editingProject || undefined}
            onSave={editingProject ? handleUpdateProject : handleAddProject}
            onCancel={handleCancelEdit}
          />
        );
      default:
        return <Dashboard projects={projects} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/30 to-purple-900/30">
      <Navigation activeView={activeView} onViewChange={handleViewChange} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
        <div className="animate-in fade-in-0 duration-700">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}

export default App;