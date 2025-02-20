import React, { useMemo, useCallback } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onEdit, onDelete }) => {
    const sortedTodos = useMemo(() => {
        return [...todos].sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
    }, [todos]);

    const handleToggle = useCallback((id: number) => {
        onToggle(id);
    }, [onToggle]);

    const handleEdit = useCallback((id: number, newText: string) => {
        onEdit(id, newText);
    }, [onEdit]);

    const handleDelete = useCallback((id: number) => {
        onDelete(id);
    }, [onDelete]);

    return (
        <ul className="list-group">
            {sortedTodos.length > 0 ? (
                sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <li className="list-group-item">Нет задач</li>
            )}
        </ul>
    );
};

export default TodoList;
