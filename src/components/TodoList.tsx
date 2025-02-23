import React, { useEffect, useMemo, useState } from "react";
import { Task } from "../types/task.ts";
import TodoItem from "./TodoItem.tsx";
import TodoInput from "./TodoInput.tsx";
import Modal from "./Modal.tsx";
import { fetchTasks, addTask, deleteTask, updateTask, toggleTask } from "../API/api.ts";

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditId, setCurrentEditId] = useState<string | null>(null);
    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
        fetchTasks().then(setTasks);
    }, []);

    const sortedTodos = useMemo(() => {
        return [...tasks].sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));
    }, [tasks]);

    const handleAddTask = async (text: string) => {
        const newTask = await addTask(text);
        setTasks([...tasks, newTask]);
    };

    const handleToggleTask = async (id: string) => {
        await toggleTask(id);
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleEditTask = async (id: string, newText: string) => {
        await updateTask(id, newText);
        setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
    };

    const openModal = (id: string, text: string) => {
        setCurrentEditId(id);
        setCurrentText(text);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
    };

    const saveEdit = async (newText: string) => {
        if (currentEditId !== null) {
            await handleEditTask(currentEditId, newText);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="container my-5 p-3 border rounded shadow-sm" style={{ maxWidth: "50%" }}>
            <h1 className="text-center mb-4">ToDo List</h1>
            <TodoInput onAdd={handleAddTask} />
            <ul className="list-group">
                {sortedTodos.length > 0 ? (
                    sortedTodos.map((task) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            onToggle={handleToggleTask}
                            onEdit={openModal}
                            onDelete={handleDeleteTask}
                        />
                    ))
                ) : (
                    <li className="list-group-item">Нет задач</li>
                )}
            </ul>
            <Modal isOpen={isModalOpen} onClose={closeEditModal} onSave={saveEdit} currentText={currentText} />
        </div>
    );
};

export default TodoList;
