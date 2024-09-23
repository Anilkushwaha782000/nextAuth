"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskList from "../components/TasklIst1";
import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSwap } from "react-icons/ai";
import Dashboard from "../components/Dashboard";

function Homepage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (status === "loading") return <p>Loading...</p>;

  const renderContent = () => {
    switch (activeTab) {
      case "todo":
        return <TaskList />;
      case "dashboard":
        return <Dashboard />;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="flex">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white p-4 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
        <nav>
          <ul>
            {["dashboard", "todo"].map((tab) => (
              <li
                key={tab}
                className={`mb-4 cursor-pointer hover:text-blue-300 ${
                  activeTab === tab ? "border-l-4 border-red-500 pl-2" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <div className="flex items-center gap-2">
                  {tab === "dashboard" && <MdDashboard size={24} />}
                  {tab === "todo" && <FaTasks size={24} />}
                  <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                </div>
              </li>
            ))}
            <li className="mb-4 flex items-center gap-2 hover:text-blue-300">
              <AiOutlineUser size={24} />
              <Link href="/profile">Profile</Link>
            </li>
            <button
              onClick={() => signOut()}
              className="mb-4 text-white-600 gap-2 flex items-center space-x-2 hover:text-red-600"
            >
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
        className={`flex-1 p-8 bg-gray-100 transition-all duration-200 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-0`}
      >
        <button
          onClick={toggleSidebar}
          className="sticky top-5 mb-3 left-6 z-40 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 md:hidden transition-transform"
        >
          {isSidebarOpen ? (
            <AiOutlineSwap size={30} />
          ) : (
            <AiOutlineSwap size={30} />
          )}
        </button>
        {renderContent()}
      </main>
    </div>
  );
}

export default Homepage;
