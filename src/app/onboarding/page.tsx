"use client"
import { useRouter } from 'next/navigation';
const Onboarding = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to CollabTask</h1>
      <p className="text-lg text-gray-600 mb-6">
        Efficiently manage and collaborate on tasks with your team in real-time.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-6"
        onClick={() => router.push('/login')}
      >
        Sign In / Sign Up
      </button>

      <h2 className="text-3xl font-semibold mb-3">Create Your First Project</h2>
      <p className="text-lg text-gray-500 mb-5">
        Set up your first project. Add tasks, assign responsibilities, and track progress.
      </p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mb-6"
        onClick={() => router.push('/task')}
      >
        Create Project
      </button>

      <h2 className="text-3xl font-semibold mb-4">Collaborate and Manage Tasks</h2>
      <p className="text-lg text-gray-500 mb-5">
        Invite your team to collaborate in real-time and manage tasks effectively.
      </p>
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
        onClick={() => router.push('/managementTaskPage')}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Onboarding;
