
import { ref, set, onValue, push,get,update,remove } from 'firebase/database';
import { database } from './firebase';
type Task = {
    title: string;
    description: string;
    status: string;
    createdAt: number;
  };

  interface TaskUpdate {
    title?: string;
    description?: string;
    completed?: boolean;
    assignedTo?:string;
    priority?:string;
  }
export const createTask = async (task: { title: string; description: string,assignedTo: string,priority:string,imageUrl:string}) => {
  const taskRef = push(ref(database, 'tasks/'));
  // const newTaskRef = ref(database, 'tasks/' + Date.now());
  await set(taskRef, {
    ...task,
    status: 'todo',
    createdAt: Date.now(),
  });
};
export const handleToggleComplete = async (taskId: string) => {
    try {
        const taskRef = ref(database, 'tasks/' + taskId);
        const snapshot = await get(taskRef); 
        if (snapshot.exists()) {
            const data = snapshot.val();
            await set(taskRef, { ...data, completed: !data.completed });
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error('Error toggling task completion:', error);
    }
};

export const updateTask=async(taskId: string, updatedData: TaskUpdate)=> {
    try {
      const taskRef = ref(database, `tasks/${taskId}`);
      await update(taskRef, updatedData);
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }


  export const deleteTask = async (taskId: string): Promise<void> => {
    try {
      const taskRef = ref(database, `tasks/${taskId}`);
      await remove(taskRef);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

export const listenToTasks = (callback: (tasks: any) => void) => {
  const tasksRef = ref(database, 'tasks/');
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    const tasks = data ? Object.entries(data).map(([id, task]) => ({ id, ...(task as Task) })) : [];
    callback(tasks);
  });
};
