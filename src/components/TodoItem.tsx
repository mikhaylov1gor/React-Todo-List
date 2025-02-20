import React from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div style={{ flex: 1, wordWrap: "break-word" }}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="me-2"
                />
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.text}
                </span>
            </div>
            <div>
                <button onClick={() => onEdit(todo.id, todo.text)} className="btn btn-outline-secondary btn-sm me-2">
                    ✏️
                </button>
                <button onClick={() => onDelete(todo.id)} className="btn btn-outline-danger btn-sm">
                    ❌
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
