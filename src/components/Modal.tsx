import React, {useEffect} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newText: string) => void;
    currentText: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, currentText }) => {
    const [newText, setNewText] = React.useState(currentText);

    useEffect(() => {
        setNewText(currentText);
    }, [currentText]);

    const handleSave = () => {
        onSave(newText);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal" style={modalBackdropStyle}>
            <div className="modal-content" style={modalContentStyle}>
                <h2>Edit Todo</h2>
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="form-control"
                    style={inputStyle}
                />
                <div style={buttonContainerStyle}>
                    <button onClick={handleSave} disabled={!newText.trim()} className="btn btn-primary">
                        Save
                    </button>
                    <button onClick={onClose} className="btn btn-secondary ml-2">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const modalBackdropStyle: React.CSSProperties = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1050,
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    marginBottom: "20px",
};

const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "5px",
};

export default Modal;
