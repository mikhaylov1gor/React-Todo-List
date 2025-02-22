import React, {useMemo, useState} from "react";
import {Task} from "../types/task.ts";
import TodoItem from "./TodoItem.tsx";
import TodoInput from "./TodoInput.tsx";
import Modal from "./Modal.tsx";


const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditId, setCurrentEditId] = useState<number | null>(null);
    const [currentText, setCurrentText] = useState("");

    const sortedTodos = useMemo(() => {
        return [...tasks].sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
    }, [tasks]);

    const addTask = (text: string) => {
        const newTodo: Task = {
            id: Date.now(),
            text,
            completed: false
        };
        setTasks([...tasks, newTodo]);

    }

    const toggleTask = (id: number) =>{
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }

    const editTask = (id: number, newText: string) =>{
        setTasks(tasks.map((task) => (task.id === id ? {...task, text: newText} : task)))
    }

    const openModal = (id: number, text: string) =>{
        setCurrentEditId(id);
        setCurrentText(text);
        setIsModalOpen(true);
    }

    const closeEditModal = () => {
        setIsModalOpen(false);
    };

    const saveEdit = (newText: string) => {
        if (currentEditId !== null) {
            editTask(currentEditId, newText);
        }
    };

    const deleteTask = (id: number) =>{
        setTasks(tasks.filter((task) => task.id !== id));
    }


    return (
        <div className="container my-5 p-3 border rounded shadow-sm" style={{maxWidth: "50%"}}>
            <h1 className="text-center mb-4">ToDo List</h1>
            <TodoInput onAdd={addTask}/>
            <ul className="list-group">
                {sortedTodos.length > 0 ? (
                    sortedTodos.map((task) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onEdit={openModal}
                            onDelete={deleteTask}
                        />
                    ))
                ) : (
                    <li className="list-group-item">Нет задач</li>
                )}
            </ul>
            <Modal isOpen={isModalOpen} onClose={closeEditModal} onSave={saveEdit} currentText={currentText}/>
        </div>
    );
}

export default TodoList;