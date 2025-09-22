import React, { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { Save, X, Plus, Minus } from 'lucide-react';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    members: [''],
    techStack: [''],
    status: 'planning' as Project['status'],
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        members: project.members,
        techStack: project.techStack,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate || '',
      });
    }
  }, [project]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (formData.members.filter(m => m.trim()).length === 0) {
      newErrors.members = 'At least one team member is required';
    }

    if (formData.techStack.filter(t => t.trim()).length === 0) {
      newErrors.techStack = 'At least one technology is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const projectData = {
      ...formData,
      members: formData.members.filter(m => m.trim()),
      techStack: formData.techStack.filter(t => t.trim()),
      endDate: formData.endDate || undefined,
    };

    onSave(projectData);
  };

  const addField = (field: 'members' | 'techStack') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'members' | 'techStack', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'members' | 'techStack', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            {project ? 'Edit Project' : 'Add New Project'}
            </h1>
            <p className="text-gray-300 text-lg">
              {project ? 'Update your project details' : 'Create a comprehensive project profile'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-3 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-base font-semibold text-gray-200 mb-3">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium text-lg"
                placeholder="Enter project title"
              />
              {errors.title && <p className="text-red-400 text-sm mt-2 font-medium">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-200 mb-3">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Project['status'] }))}
                className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-200 mb-3">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
              />
              {errors.startDate && <p className="text-red-400 text-sm mt-2 font-medium">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-200 mb-3">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
              />
              {errors.endDate && <p className="text-red-400 text-sm mt-2 font-medium">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-200 mb-3">
              Project Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={5}
              className="w-full bg-gray-800/60 border border-gray-600/50 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none font-medium leading-relaxed"
              placeholder="Describe your project in detail..."
            />
            {errors.description && <p className="text-red-400 text-sm mt-2 font-medium">{errors.description}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-base font-semibold text-gray-200">
                Team Members *
              </label>
              <button
                type="button"
                onClick={() => addField('members')}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>
            <div className="space-y-3">
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => updateField('members', index, e.target.value)}
                    className="flex-1 bg-gray-800/60 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
                    placeholder="Enter team member name"
                  />
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('members', index)}
                      className="p-3 text-gray-400 hover:text-red-400 hover:bg-gray-800/60 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-red-400/30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.members && <p className="text-red-400 text-sm mt-2 font-medium">{errors.members}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-base font-semibold text-gray-200">
                Technology Stack *
              </label>
              <button
                type="button"
                onClick={() => addField('techStack')}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
              >
                <Plus className="w-4 h-4" />
                <span>Add Technology</span>
              </button>
            </div>
            <div className="space-y-3">
              {formData.techStack.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => updateField('techStack', index, e.target.value)}
                    className="flex-1 bg-gray-800/60 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-medium"
                    placeholder="Enter technology name"
                  />
                  {formData.techStack.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('techStack', index)}
                      className="p-3 text-gray-400 hover:text-red-400 hover:bg-gray-800/60 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-red-400/30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.techStack && <p className="text-red-400 text-sm mt-2 font-medium">{errors.techStack}</p>}
          </div>

          <div className="flex items-center justify-end space-x-6 pt-8 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl font-semibold transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-3 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25 shadow-lg"
            >
              <Save className="w-5 h-5" />
              <span>{project ? 'Update Project' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}