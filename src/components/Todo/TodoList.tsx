import React, { useEffect, useMemo, useState } from "react";
import { Task } from "../../types/task.ts";
import TodoItem from "./TodoItem.tsx";
import TodoInput from "./TodoInput.tsx";
import Modal from "./Modal.tsx";
import { fetchTasks, addTask, deleteTask, updateTask, toggleTask } from "../../API/api.ts";
import ErrorModal from "../ErrorWrapper/ErrorModal.tsx";

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Map<string, Task>>(new Map());
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
                const tasksMap = new Map<string, Task>(data.map(task => [task.id, task]));
                setTasks(tasksMap);
            } catch (error) {
                console.error("Ошибка при загрузке задач:", error);
            }
        };
        fetchData();
    }, []);

    const sortedTodos = useMemo(() => {
        return Array.from(tasks.values()).sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));
    }, [tasks]);


    const handleAddTask = async (text: string) => {
        try {
            const newTask = await addTask(text);
            setTasks(prevTasks => new Map(prevTasks).set(newTask.id, newTask));
        } catch (error) {
            setErrorMessage("Ошибка при добавлении задачи: " + error);
            setIsErrorModalOpen(true);
        }
    };

    const handleToggleTask = async (currentTask: Task) => {
        try {
            await toggleTask(currentTask.id);
            setTasks(prevTasks => {
                const updatedTasks = new Map(prevTasks);
                const task = updatedTasks.get(currentTask.id);
                if (task) {
                    updatedTasks.set(currentTask.id, { ...task, isCompleted: !task.isCompleted });
                }
                return updatedTasks;
            });
        } catch (error) {
            setErrorMessage("Ошибка при изменении статуса задачи:" + error);
            setIsErrorModalOpen(true);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks(prevTasks => {
                const updatedTasks = new Map(prevTasks);
                updatedTasks.delete(id);
                return updatedTasks;
            });
        } catch (error) {
            setErrorMessage("Ошибка при удалении задачи: " + error);
            setIsErrorModalOpen(true);
        }
    };

    const handleEditTask = async (id: string, newText: string) => {
        try {
            await updateTask(id, newText);
            setTasks(prevTasks => {
                const updatedTasks = new Map(prevTasks);
                const task = updatedTasks.get(id);
                if (task) {
                    updatedTasks.set(id, { ...task, text: newText });
                }
                return updatedTasks;
            });
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
        console.log ("draggedItem: " + task.id)
    };

    const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
    };

    const handleDrop = (targetTask: Task) => {
        if (!draggedItem || draggedItem.id === targetTask.id) return;

        setTasks(prevTasks => {
            const updatedTasks = new Map(prevTasks);
            const taskIds = Array.from(updatedTasks.keys());
            const draggedItemIndex = taskIds.indexOf(draggedItem.id);
            const targetItemIndex = taskIds.indexOf(targetTask.id);

            if (draggedItemIndex !== -1 && targetItemIndex !== -1) {
                taskIds.splice(draggedItemIndex, 1);
                taskIds.splice(targetItemIndex, 0, draggedItem.id);
                const reorderedTasks = new Map();
                taskIds.forEach(id => {
                    reorderedTasks.set(id, updatedTasks.get(id)!);
                });

                return reorderedTasks;
            }

            return updatedTasks;
        });

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
