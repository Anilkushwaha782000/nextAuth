// components/UserProfileMenu.tsx
"use client"
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
const UserProfileMenu = () => {
    const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push('/login'); 
  };
  if (!session?.user) return null; 
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>
    <div className="flex flex-col items-center mb-4">
        <img
          src={session?.user.image || '/default-profile.png'} 
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
      </div>
    <form className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-1 text-gray-600">Username</label>
        <input
          type="text"
          value={session?.user.name || 'No Username'}
          readOnly
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-600">Email</label>
        <input
          type="email"
          value={session?.user.email || 'No Email'}
          readOnly
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="button"
        onClick={() => handleLogout()}
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Sign Out
      </button>
    </form>
  </div>
  );
};

export default UserProfileMenu;
