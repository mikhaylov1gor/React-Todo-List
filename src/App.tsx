import React, { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Todo } from "./types/todo";
import Modal from "./components/Modal";

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditId, setCurrentEditId] = useState<number | null>(null);
    const [currentText, setCurrentText] = useState("");

    const addTodo = (text: string) => {
        const newTodo: Todo = { id: Date.now(), text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const editTodo = (id: number, newText: string) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const openEditModal = (id: number, text: string) => {
        setCurrentEditId(id);
        setCurrentText(text);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveEdit = (newText: string) => {
        if (currentEditId !== null) {
            editTodo(currentEditId, newText);
        }
    };

    return (
        <div className="container my-5 p-3 border rounded shadow-sm" style={{ maxWidth: "50%" }}>
            <h1 className="text-center mb-4">ToDo List</h1>
            <TodoForm onAdd={addTodo} />
            <TodoList todos={todos} onToggle={toggleTodo} onEdit={openEditModal} onDelete={deleteTodo} />
            <Modal
                isOpen={isModalOpen}
                onClose={closeEditModal}
                onSave={handleSaveEdit}
                currentText={currentText}
            />
        </div>
    );
};

export default App;
