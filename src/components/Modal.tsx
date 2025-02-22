import React, { useEffect } from "react";

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

    const handleCancel = () => {
        setNewText(currentText);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Todo</h5>
                        <button type="button" className="btn-close" onClick={handleCancel}></button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={handleSave}
                            disabled={!newText.trim()}
                            className="btn btn-primary"
                        >
                            Save
                        </button>
                        <button onClick={handleCancel} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;