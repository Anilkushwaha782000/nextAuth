"use client";
import { useState, useEffect } from "react";
import {
  FaTasks,
  FaUsers,
  FaChartPie,
  FaCog,
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useSession } from 'next-auth/react';
import { listenToTasks,deleteTask } from "../utils/taskService";
const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const getCompletedTask = (): number => {
    const completedTaskCount = tasks.filter((item) => item.completed).length;
    return completedTaskCount;
  };
  const getInCompletedTask = (): number => {
    const completedTaskCount = tasks.filter((item) => !item.completed).length;
    return completedTaskCount;
  };
  useEffect(() => {
    listenToTasks((updatedTasks) => {
      setTasks(updatedTasks);
    });
  }, []);
  const handleDelete=async(id:string)=>{
    await deleteTask(id);
  }
  console.log("taks>>",tasks)
  return (
    <div className="flex bg-gray-100">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 bg-white px-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Task Management Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src={session?.user?.image || '/default-profile.png'} 
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Total Tasks</h2>
              <p className="text-2xl font-bold">{tasks && tasks.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Completed Task</h2>
              <p className="text-2xl font-bold"> {getCompletedTask()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Pending Tasks</h2>
              <p className="text-2xl font-bold">{getInCompletedTask()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Team Members</h2>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 underline">Task List</h2>
          <section className="mb-6 max-h-80 overflow-auto">
            {tasks.length > 0 ? (
              tasks.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md space-y-3 mt-2 mb-4"
                >
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Assigned to {item.assignedTo}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-red-500" onClick={()=>handleDelete(item.id)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
