import React, { useState } from "react";

interface TodoFormProps {
    onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex mb-3">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Новая задача..."
                className="form-control"
            />
            <button
                type="submit"
                className="btn btn-primary ms-2"
                disabled={!text.trim()}
            >
                Добавить
            </button>
        </form>
    );
};

export default TodoForm;
