interface WarningDeleteAllModalProps{
    closeModal: () => void
    deleteAllTodos: () => void
}

const WarningDeleteAllModal: React.FC<WarningDeleteAllModalProps> = ({ closeModal, deleteAllTodos }) => {
    return (
        <div className="warning-modal" data-cy="warning-modal">
            <h3>Warning: this operation will delete all your todos! Are you sure to continue?</h3>
            <div className="warning-modal-btn-container">
                <button className="warning-modal-btn"
                data-cy="modal-yes-btn"
                onClick={deleteAllTodos}
                >Yes</button>       
                <button className="warning-modal-btn"
                onClick={closeModal}
                data-cy="modal-no-btn"
                >No</button> 
            </div>      
        </div>
    );
}
 
export default WarningDeleteAllModal;