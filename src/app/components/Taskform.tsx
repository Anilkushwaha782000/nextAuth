// TaskForm.tsx
import { useState, FormEvent } from 'react';
import { createTask } from '../utils/taskService'; 

const TaskForm = () => {
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('');
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      
      await createTask({ title, description,assignedTo });
      setSuccess('Task created successfully!')
      setTimeout(()=>{
        setSuccess(null)
      },2000)
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mb-6 mt-16">
  <h2 className="text-2xl font-semibold mb-4">Create a New Task</h2>
  <form onSubmit={handleSubmit} className="space-y-4 w-full">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder='title'
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Assigned to</label>
      <input
        type="text"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        placeholder="Assign to"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Priority</label>
      <input
        type="text"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Low/Medium/High"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors duration-150`}
    >
      {loading ? 'Creating...' : 'Create Task'}
    </button>

    {error && <p className="text-red-600 text-sm">{error}</p>}
    {success && <p className="text-green-600 text-sm">{success}</p>}
  </form>
</div>

  );
};

export default TaskForm;
