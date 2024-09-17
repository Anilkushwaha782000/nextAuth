"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  priority?: string;
  assignedTo?: string;
}

interface KanbanBoardProps {
  tasks: Task[];
}

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-2 mb-2 rounded-lg shadow-sm"
    >
      <h3 className="text-md font-semibold text-gray-700 mb-1">{task.title}</h3>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between">
          <span>Assigned to:</span>
          <span>{task.assignedTo || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span>Created At:</span>
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Priority:</span>
          <span>{task.priority || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTaskList((items) => {
        const oldIndex = items.findIndex((task) => task.id === active.id);
        const newIndex = items.findIndex((task) => task.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={taskList} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {taskList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
};

export default KanbanBoard;
