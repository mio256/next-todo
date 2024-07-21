"use client";

import { useState, useEffect, useCallback } from "react";
import createTask from "@/lib/task/createTask";
import readTasks from "@/lib/task/readTasks";
import doneTask from "@/lib/task/doneTask";

type Props = {
  userId: string;
};

type Task = {
  id: number;
  user_id: string;
  title: string;
  done: boolean;
};

const useTasks = (userId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await readTasks(userId);
      if (data) {
        setTasks(data);
        setError(null);
      } else {
        setError("Failed to fetch tasks");
      }
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks };
};

const TaskManager = ({ userId }: Props) => {
  const [title, setTitle] = useState("");
  const { tasks, loading, fetchTasks } = useTasks(userId);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTask(userId, title);
      setTitle("");
      await fetchTasks();
    } catch {
      setError("Failed to create task");
    }
  };

  const handleCheckboxChange = async (id: number) => {
    try {
      await doneTask(id);
      await fetchTasks();
    } catch {
      setError("Failed to update task");
    }
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
      <form className="w-full max-w-sm mb-6" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="New Task Name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => setTitle("")}
          >
            Cancel
          </button>
        </div>
      </form>

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

export default TaskManager;
