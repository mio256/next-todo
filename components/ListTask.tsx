"use client";

import { useState, useEffect } from "react";
import readTasks from "@/lib/task/readTasks";

type Props = {
  userId: string;
};

type Task = {
  id: number;
  user_id: string;
  title: string;
  done: boolean;
};

const ListTask = ({ userId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await readTasks(userId);
        if (data) {
          setTasks(data);
        } else {
          setError("Failed to fetch tasks");
        }
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleCheckboxChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center" aria-label="Loading">
        <div className="animate-ping h-4 w-4 bg-blue-400 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div className="flex items-center mb-4" key={task.id}>
          <input
            id={`checkbox-${task.id}`}
            type="checkbox"
            checked={task.done}
            onChange={() => handleCheckboxChange(task.id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={`checkbox-${task.id}`}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {task.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ListTask;
