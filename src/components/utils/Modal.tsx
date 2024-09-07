type IProps = {
    children: React.ReactNode;
    modalId: string;
    extraModalBoxClasses?: string;
};

const Modal: React.FC<IProps> = ({
    modalId,
    extraModalBoxClasses,
    children,
}) => {
    return (
        <div className="modal">
            <div className={`modal-box ${extraModalBoxClasses}`}>
                {children}
            </div>
            <label className="modal-backdrop" htmlFor={modalId}>
                Close
            </label>
        </div>
    );
};

export default Modal;
