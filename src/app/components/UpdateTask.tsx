import { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database'; // Import Firebase functions

type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
  completed: boolean;
};

type UpdateTaskFormProps = {
  task: Task;
  onClose: () => void;
};

const UpdateTaskForm = ({ task, onClose }: UpdateTaskFormProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || '');
  const [comment, setComment] = useState('');
  const handleUpdate = async () => {
    const db = getDatabase(); 
    const taskRef = ref(db, `tasks/${task.id}`); 
    try {
      await update(taskRef, {
        title,
        description,
        assignedTo,
        comment,
      });
      onClose(); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assigned To</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskForm;
