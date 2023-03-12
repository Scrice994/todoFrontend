interface WarningDeleteAllModalProps{
    closeModal: () => void
    deleteAllTodos: () => void
}

const WarningDeleteAllModal: React.FC<WarningDeleteAllModalProps> = ({ closeModal, deleteAllTodos }) => {
    return (
        <div className="warning-modal">
            <h3>Warning: this operation will delete all your todos! Are you sure to continue?</h3>
            <div className="warning-modal-btn-container">
                <button className="warning-modal-btn"
                onClick={deleteAllTodos}
                >Yes</button>       
                <button className="warning-modal-btn"
                onClick={closeModal}
                >No</button> 
            </div>      
        </div>
    );
}
 
export default WarningDeleteAllModal;