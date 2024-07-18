"use client";

import { useState } from "react";
import createTask from "@/lib/task/createTask";

type Props = {
  userId: string
};

const TaskForm = ({ userId }: Props) => {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask(userId, title);
    setTitle(""); // フォームをクリア
  }

  const handleCancel = () => {
    setTitle(""); // フォームをクリア
  }

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="New Task Name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
          Add
        </button>
        <button
          className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default TaskForm;
