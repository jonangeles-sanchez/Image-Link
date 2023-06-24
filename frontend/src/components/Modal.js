import { RiCloseLine } from "react-icons/ri";

function Modal(props) {
  return (
    <>
      <div className="darkBG" onClick={props.closeModal} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
          <button className="closeBtn" onClick={props.closeModal}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            Are you sure you want to delete the item?
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={props.closeModal}>
                Delete
              </button>
              <button className="cancelBtn" onClick={props.closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
