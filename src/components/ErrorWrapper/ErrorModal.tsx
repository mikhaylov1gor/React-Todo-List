import React from "react";

interface ErrorModalProps{
    isOpen: boolean,
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({isOpen, message, onClose}) =>{
    return (
        <div className={`modal fade ${isOpen ? "show d-block" : "d-none"}`} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ошибка</h5>
                        <button type="button" className="btn-close" onClick={onClose}/>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={onClose}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;