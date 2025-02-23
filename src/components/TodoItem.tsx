import React from "react";
import {Task} from "../types/task.ts";


interface TodoItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({task, onToggle, onEdit, onDelete }) =>{

    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div style={{ flex: 1, wordWrap: "break-word" }}>
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => onToggle(task.id)}
                    className="me-2"
                />
                <span style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
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