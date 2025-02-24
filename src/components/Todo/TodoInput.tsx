import React, { useState } from "react";

interface TodoInputProp{
    onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProp> = ({ onAdd }) => {
    const [text, setText] = useState("");

    const handleInputChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText("");
    };

    return (
        <form onSubmit={handleInputChange} className="d-flex mb-3">
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
}

export default TodoInput;