import { useEffect, useState } from "react";
import { listenToTasks } from "../utils/taskService";
import { handleToggleComplete } from "../utils/taskService";
import { deleteTask } from "../utils/taskService";
import UpdateTaskForm from "./UpdateTask";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "../userContext";
export type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
  completed: boolean;
  priority?: string;
};
const TaskList = () => {
  const {role}=useUser()
  const [tasks, setTasks] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [isToggled, setIsToggled] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = role=='admin';
  useEffect(() => {
    listenToTasks((updatedTasks) => {
      setTasks(updatedTasks);
    });
  }, []);
  const toggleExpand = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    setIsToggled(!isToggled);
  };
  const handleClick = async (taskId: string) => {
    try {
      await handleToggleComplete(taskId);
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };
  const handleEditClick = (task: Task) => {
    setEditTask(task);
  };
  const handleDeleteTask = async (taskid: string) => {
    try {
      await deleteTask(taskid);
    } catch (error) {
      console.error("Error in deleting the task:", error);
    }
  };
  const handleFormClose = () => {
    setEditTask(null);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-96 max-w-screen mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Task List</h2>
      <div className="space-y-4 max-h-96 overflow-auto">
        {tasks && tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            Task list is empty. Continue to add tasks.
          </p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out list-none mb-4"
              >
            {true && (
                     <div className="flex gap-4 absolute top-2 right-2">
                     <button
                       onClick={() => handleDeleteTask(task.id)}
                       className="text-red-400 hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
                       aria-label="Delete Task"
                     > 
                       <FaTrash className="block md:hidden" />
                       <span className="hidden md:block">Delete</span>
                     </button>
   
                     <button
                       onClick={() => handleEditClick(task)}
                       className="text-blue-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
                       aria-label="Edit Task"
                     >
                       <FaPencilAlt className="block md:hidden" />
                       <span className="hidden md:block">Edit</span>
                     </button>
                   </div>
            )}

                <div
                  className="flex flex-row gap-2"
                  onClick={() => toggleExpand(task.id)}
                >
                  {isToggled ? (
                    <FaChevronDown className="h-4 w-4 text-gray-400 text-sm" />
                  ) : (
                    <FaChevronUp className="h-4 w-4 text-gray-400 text-sm" />
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {task.title}
                  </h3>
                </div>
                {expandedTaskId === task.id && (
                  <div className="transition-all duration-300 ease-in-out">
                    <p className="text-gray-700 text-xs md:text-sm mb-2">{task.description}</p>
                    <div className="gap-4 flex">
                      <span
                        className={`text-lg ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-black"
                        }`}
                      >
                        {task.assignedTo && (
                         <div className="flex flex-row items-center justify-center gap-1">
                          <Image src={task?.imageUrl} alt="Avatar" className="w-8 h-8 rounded-full "/>
                           <span className="text-xs md:text-sm text-gray-700">
                            Assigned to: {task.assignedTo}
                          </span>
                         </div>
                        )}
                      </span>
                      <button
                        onClick={() => handleClick(task.id)}
                        className={`px-4 py-2 font-semibold text-gray-600 rounded-full 
                        ${
                          task.completed
                            ? "text-sm bg-red-300 hover:bg-yellow-600"
                            : "text-sm bg-green-300 hover:bg-gray-400"
                        }`}
                      >
                        {task.completed ? "Mark Uncomplete" : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {editTask && <UpdateTaskForm task={editTask} onClose={handleFormClose} />}
    </div>
  );
};

export default TaskList;
