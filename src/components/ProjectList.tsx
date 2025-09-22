import React, { useState, useMemo } from 'react';
import { Project } from '../types/project';
import ProjectCard from './ProjectCard';
import SearchFilter from './SearchFilter';
import { FolderOpen } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [techFilter, setTechFilter] = useState('');

  const availableTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.members.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = !statusFilter || project.status === statusFilter;

      const matchesTech = !techFilter || project.techStack.includes(techFilter);

      return matchesSearch && matchesStatus && matchesTech;
    });
  }, [projects, searchTerm, statusFilter, techFilter]);

  const handleDelete = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project && window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white tracking-tight">Project Portfolio</h1>
        <div className="text-gray-300 bg-gray-800/40 px-4 py-2 rounded-xl border border-gray-700/50">
          {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        techFilter={techFilter}
        onTechFilterChange={setTechFilter}
        availableTechs={availableTechs}
      />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-800/30 rounded-2xl p-12 border border-gray-700/30">
            <FolderOpen className="w-24 h-24 text-gray-500 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-300 mb-4">
            {projects.length === 0 ? 'No projects yet' : 'No projects match your filters'}
            </h2>
            <p className="text-gray-400 text-lg">
            {projects.length === 0 
              ? 'Create your first project to get started'
              : 'Try adjusting your search or filter criteria'
            }
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}