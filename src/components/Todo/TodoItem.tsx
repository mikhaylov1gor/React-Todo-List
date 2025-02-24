import React from "react";
import {Task} from "../../types/task.ts";


interface TodoItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
    onDragStart: (task: Task) => void;
    onDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
    onDrop: (task: Task) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({task, onToggle, onEdit, onDelete, onDragStart, onDragOver, onDrop}) =>{

    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div style={{ flex: 1, wordWrap: "break-word" }}>
                <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    draggable
                    onDragStart={() => onDragStart(task)}
                    onDragOver={onDragOver}
                    onDrop={() => onDrop(task)}
                >
                    <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => onToggle(task.id)}
                        className="me-2"
                    />
                    <span style={{ textDecoration: task.isCompleted ? "line-through" : "none", flexGrow: 1 }}>
                {task.text}
            </span>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(task.id, task.text)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)}>🗑️</button>
                </li>
            </div>
        </div>
    );
};

export default TodoItem;