"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { listenToTasks } from "@/app/utils/taskService";
import { database } from "@/app/utils/firebase";
import {
  getDatabase,
  ref,
  query,
  update,
  onValue,
  get,
  orderByChild,
  equalTo,
} from "firebase/database";
const sanitizeEmailForFirebase = (email: string) => {
  return email.replace(/\./g, "_");
};
interface User {
  username: string;
  email: string;
  role: string;
}
const TeamMember = () => {
  const { shortId } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const response = await fetch(`/api/getuser/${shortId}`);
        const userData = await response.json();
        if (shortId) {
          setDeleteId(shortId as string);
        }
        setUser(userData);
        if (userData?.email) {
          const sanitizedEmail = sanitizeEmailForFirebase(userData.email);
          const taskRef = ref(database, `tasks`);
          const taskQuery = query(
            taskRef,
            orderByChild("assignedTo"),
            equalTo(userData.email)
          );
          const snapshot = await get(taskQuery);
          if (snapshot.exists()) {
            const tasksData = snapshot.val();
            const tasksArray = Object.keys(tasksData).map((key) => ({
              id: key,
              ...tasksData[key],
            }));
            setTasks(tasksArray);
          } else {
            console.log("No data available");
          }
        }
      } catch (error) {
        console.error("Error fetching user or tasks:", error);
      }
    };

    if (shortId) {
      fetchUserAndTasks();
    }
  }, [shortId]);

  const handleDeleteUser=async()=>{
  try {
    const response=await fetch(`/api/deleteuser/${deleteId}`)
    if(response.ok){
      const data=response.json();
      console.log(data+"user deleted successfully");
    }
    
  } catch (error:any) {
    console.log(error+"Error in deleteing user");
  }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {user && (
          <div className="flex items-center bg-blue-600 p-6">
            <img
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              src="/profile.jpg"
              alt="Team Member"
            />
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-white">
                {user?.username}
              </h2>
              <p className="text-blue-200">Frontend Developer</p>
              <p className="text-sm text-blue-300">{user?.email}</p>
            </div>
          </div>
        )}

        {/* Task and Activity Section */}
        <div className="p-6">
          {/* Assigned Tasks */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Assigned Tasks
            </h3>
            <ul className="space-y-4">
              {tasks &&
                tasks.map((item) => (
                  <div>
                    <li className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                      <div key={item.index}>
                        <h4 className="font-medium text-gray-700">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                        Mark Complete
                      </button>
                    </li>
                  </div>
                ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <ul className="space-y-4">
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">
                  Completed the task{" "}
                  <span className="font-medium text-gray-800">
                    "Design Homepage"
                  </span>{" "}
                  on Sep 18, 2024.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">
                  Updated the task{" "}
                  <span className="font-medium text-gray-800">
                    "Fix Header Bugs"
                  </span>
                  .
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-gray-200 p-6 rounded-b-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
          <button  onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
            Remove from Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
