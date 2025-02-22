import React from "react";
import {Task} from "../types/task.ts";


interface TodoItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({task, onToggle, onEdit, onDelete }) =>{

    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div style={{ flex: 1, wordWrap: "break-word" }}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="me-2"
                />
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                    {task.text}
                </span>
            </div>
            <div>
                <button onClick={() => onEdit(task.id, task.text)} className="btn btn-outline-secondary btn-sm me-2">
                    ✏️
                </button>
                <button onClick={() => onDelete(task.id)} className="btn btn-outline-danger btn-sm">
                    ❌
                </button>
            </div>
        </div>
    );
};

export default TodoItem;