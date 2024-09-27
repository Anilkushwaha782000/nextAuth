"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaTasks,
  FaUsers,
  FaChartPie,
  FaCog,
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { listenToTasks, deleteTask } from "../utils/taskService";
import KanbanBoard from "./KanbanBoard";
import Loader from "./loder";
import Image from "next/image";
import { useUser } from "../userContext";
interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  shortId: string;
}
const Dashboard = () => {
  const {role}=useUser()
  const [tasks, setTasks] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("tasklist");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const isAdmin = role === "admin";
  useEffect(() => {
    listenToTasks((updatedTasks) => {
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    });
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/getuser");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  if (status === "loading") {
    return <Loader />;
  }
  const getCompletedTask = (): number => {
    const completedTaskCount = tasks.filter((item) => item.completed).length;
    return completedTaskCount;
  };
  const getInCompletedTask = (): number => {
    const completedTaskCount = tasks.filter((item) => !item.completed).length;
    return completedTaskCount;
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(query)
      );
      setFilteredTasks(filtered); 
    } else {
      setFilteredTasks(tasks);
    }
  };
  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShortId = event.target.value;
    if (selectedShortId) {
      router.push(`/users/${selectedShortId}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <div className="flex bg-gray-100">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex flex-col md:flex-row items-center justify-between h-16 bg-white px-4 border-b border-gray-200">
          <h1 className="text-sm md:text-xl font-semibold">
            Task Management Dashboard
          </h1>
          <div className="flex items-center space-x-4 mt-4 mb-4 md:mb-0 md:mt-0 ">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Image
              src={session?.user?.image || "/default-profile.png"}
              alt="User"
              width={10}
              height={10}
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mt-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-sm md:text-lg font-semibold mb-2">
                Total Tasks
              </h2>
              <p className="text-xs md:text-2xl font-bold">
                {tasks && tasks.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-sm md:text-lg font-semibold mb-2">
                Completed Task
              </h2>
              <p className="text-xs md:text-2xl font-bold">
                {" "}
                {getCompletedTask()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-sm md:text-lg font-semibold mb-2">
                Pending Tasks
              </h2>
              <p className="text-xs md:text-2xlfont-bold">
                {getInCompletedTask()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-sm md:text-lg font-semibold mb-2">
                Team Member
              </h2>
              <p className="text-xs md:text-2xl font-bold">
                {users && users.length}
              </p>
            </div>
          </div>
        </main>
        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => handleTabClick("tasklist")}
            className={`py-2 px-4 ${
              activeTab === "tasklist"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Task List
          </button>
          <button
            onClick={() => handleTabClick("kanbanboard")}
            className={`py-2 px-4 ${
              activeTab === "kanbanboard"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => handleTabClick("teammember")}
            className={`py-2 px-4 ${
              activeTab === "teammember"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Team Member
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "tasklist" && (
            <div>
              <section className="mb-6 max-h-72 overflow-auto flex-1">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-lg shadow-md space-y-3 mt-2 mb-4"
                    >
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                         <div className="flex flex-row gap-1 items-center justify-center">
                          <Image src={item?.imageUrl}  height={8} width={8} alt="image is not found" className="w-8 h-8 rounded-full "/>
                         <p className="text-sm text-gray-500">
                            Assigned to {item.assignedTo}
                          </p>
                         </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {true && (
                            <button
                              className="text-red-500"
                              onClick={() => handleDelete(item.id)}
                            >
                              <FaTrashAlt />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </section>
            </div>
          )}
          {activeTab === "kanbanboard" && (
            <div>
              <KanbanBoard tasks={tasks} />
            </div>
          )}
          {activeTab === "teammember" && (
            <div className="max-w-md mx-auto p-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Select a Team Member:
              </label>
              <select
                className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSelectChange}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select a User --
                </option>
                {users.map((user) => (
                  <option key={user.shortId} value={user.shortId}>
                    {user.username} - {user.email}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
