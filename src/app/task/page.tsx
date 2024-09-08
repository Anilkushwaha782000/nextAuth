'use client';
import React,{ useState, useEffect } from 'react';
import TaskForm from '../components/Taskform';
import TaskList from '../components/TasklIst1';
import { updateTask } from '../utils/taskService';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
export type Task = {
  _id: string; 
  title: string;
  completed: boolean;
  description: string;
  assignedto?: string; 
};

export default function TaskPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  if(status==='loading')return <p>Loading...</p>;
  if(session==null){
      router.push("/login")
  }
 
  const handleUpdateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    await updateTask(taskId, updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };
  return (
    <div>
      <TaskForm   />
      {/* <TaskList  /> */}
    </div>
  );
}
