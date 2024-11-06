import React from 'react'

const PopupModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            {children}
        </div>
    );
};

export default PopupModal