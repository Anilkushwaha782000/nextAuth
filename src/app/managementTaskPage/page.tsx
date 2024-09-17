"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TaskList from '../components/TasklIst1';
import { FaTasks } from 'react-icons/fa'; 
import { MdDashboard } from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'; 
import { AiOutlineUser } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import Dashboard from '../components/Dashboard';
function Homepage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  if (status === 'loading') return <p>Loading...</p>;
  if (!session) {
    router.push('/login');
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'todo':
        return <TaskList />;
      case 'dashboard':
        return <Dashboard/>;
      case 'setting':
        return <h1>Setting page</h1>;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
        <nav>
          <ul>
          <li
              className={`mb-4 cursor-pointer hover:text-blue-300 ${activeTab === 'dashboard' ? 'border-l-4 border-red-500 pl-2' : ''
                }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <div className='flex flex-row gap-2'>
              <MdDashboard size={24} />
              <span>Dashboard</span>
              </div>
            </li>
            <li
              className={`mb-4 cursor-pointer hover:text-blue-300 ${activeTab === 'todo' ? 'border-l-4 border-red-500 pl-2' : ''
                }`}
              onClick={() => setActiveTab('todo')}
            >
              <div className='flex flex-row gap-2'>
              <FaTasks size={24} />
              <span>Todo</span>
              </div>
            </li>
            <li
              className={`mb-4 cursor-pointer hover:text-blue-300 ${activeTab === 'setting' ? 'border-l-4 border-red-500 pl-2' : ''
                }`}
              onClick={() => setActiveTab('setting')}
            >
              <div className='flex flex-row gap-2'>
              <FiSettings size={24} />
              <span>Setting</span>
              </div>
            </li>
            <li className="mb-4 flex flex-row gap-2 hover:text-blue-300">
              <AiOutlineUser size={24}/>
              <Link href="/profile" className="">
                Profile
              </Link>
            </li>
            <button onClick={() => signOut()} className="mb-4 text-white-600 gap-2 flex items-center space-x-2 hover:text-red-600">
              Sign out
              <FiLogOut size={24} />
            </button>
          </ul>
        </nav>
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <main
        className={`flex-1 p-8 bg-gray-100 transition-all duration-200 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'
          } md:ml-0`}
      >
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-40 bg-gray-800 text-white p-2 rounded md:hidden"
        >
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
        {renderContent()}
      </main>
    </div>
  );
}

export default Homepage;
