import React, { useEffect, useMemo, useState } from "react";
import { Task } from "../../types/task.ts";
import TodoItem from "./TodoItem.tsx";
import TodoInput from "./TodoInput.tsx";
import Modal from "./Modal.tsx";
import { fetchTasks, addTask, deleteTask, updateTask, toggleTask } from "../../API/api.ts";
import ErrorModal from "../ErrorWrapper/ErrorModal.tsx";

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [currentEditId, setCurrentEditId] = useState<string | null>(null);
    const [currentText, setCurrentText] = useState("");
    const [draggedItem, setDraggedItem] = useState<Task | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (error) {
                setErrorMessage("Ошибка при загрузке задач: " + error);
            }
        };

        fetchData();
    }, []);

    const sortedTodos = useMemo(() => {
        return [...tasks].sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));
    }, [tasks]);

    const handleAddTask = async (text: string) => {
        try {
            const newTask = await addTask(text);
            setTasks([...tasks, newTask]);
        } catch (error) {
            setErrorMessage("Ошибка при добавлении задачи: " + error);
            setIsErrorModalOpen(true);
        }
    };

    const handleToggleTask = async (id: string) => {
        try {
            await toggleTask(id);
            setTasks(tasks.map((task) =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            ));
        } catch (error) {
            setErrorMessage("Ошибка при изменении статуса задачи:" + error);
            setIsErrorModalOpen(true);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            setErrorMessage("Ошибка при удалении задачи: " + error);
            setIsErrorModalOpen(true);
        }
    };

    const handleEditTask = async (id: string, newText: string) => {
        try {
            await updateTask(id, newText);
            setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
        } catch (error) {
            setErrorMessage("Ошибка при редактировании задачи: " + error);
            setIsErrorModalOpen(true);
        }
    };

    // для изменения задачи
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

    // для отловки ошибок
    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
        setErrorMessage(null);
    };

    // drag-n-drop
    const handleDragStart = (task: Task) => {
        setDraggedItem(task);
    };

    const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
    };

    const handleDrop = (targetTask: Task) => {
        if (!draggedItem || draggedItem.id === targetTask.id) return;

        const newTasks = [...tasks];
        const fromIndex = newTasks.findIndex((t) => t.id === draggedItem.id);
        const toIndex = newTasks.findIndex((t) => t.id === targetTask.id);

        if (fromIndex !== -1 && toIndex !== -1) {
            newTasks.splice(fromIndex, 1);
            newTasks.splice(toIndex, 0, draggedItem);
            setTasks(newTasks);
        }

        setDraggedItem(null);
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
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        />
                    ))
                ) : (
                    <li className="list-group-item">Нет задач</li>
                )}
            </ul>
            <Modal isOpen={isModalOpen} onClose={closeEditModal} onSave={saveEdit} currentText={currentText} />
            <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} message={errorMessage}/>
        </div>
    );
};

export default TodoList;
