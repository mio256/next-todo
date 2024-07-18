"use client"

import { useState } from "react"
import createTask from "@/lib/task/createTask";

type Props = {
    userId: string
};

const TaskForm = ({userId} : Props) => {
    const [title, setTitle] = useState("")

    return (
        <form className="flex flex-col gap-4" action={() => {
            createTask(userId, title);
        }}>
            <label>
                <span className="font-bold">Task name</span>
                <input
                    type="text"
                    className="border border-foreground/10 p-2"
                    placeholder="Buy milk"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </label>
            <button className="bg-purple-950 text-white p-2 rounded-md">
                Add Task
            </button>
        </form>
    )
}

export default TaskForm;
