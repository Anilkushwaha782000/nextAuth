// TaskForm.tsx
"use client"
import { useState, FormEvent,useEffect } from 'react';
import { createTask } from '../utils/taskService'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
interface User {
  id: string;
  username: string;
  role: string;
  email:string;
  shortId: string;
}
const TaskForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState("")
  const [image, setImage] = useState<File | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/getuser');
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUsers(data) 
      } catch (error:any) {
        setError(error.message);
        console.error('Error fetching user:', error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    let imageUrl=''
    if (image) {
      // Upload the image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);

      try {
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
        console.log("ImageUrl>>",imageUrl) 
      } catch (err) {
        setError('Failed to upload image. Please try again.');
        setLoading(false);
        return;
      }
    }
    try {
      
      await createTask({ title, description,assignedTo,priority,imageUrl });
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
      <select
            className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAssignedTo(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select a User --
            </option>
            {users.map((user) => (
              <option key={user.shortId} value={user.email}>
                 {user.username}
              </option>
            ))}
          </select>
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
    <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*" 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
