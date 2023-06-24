import { RiCloseLine } from "react-icons/ri";

function Modal(props) {
  const copyUrl = () => {
    navigator.clipboard.writeText(props.url);
    alert("Copied to clipboard!");
  };
  return (
    <>
      <div className="darkBG" onClick={props.closeModal} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Share your ImageLink!</h5>
          </div>
          <button className="closeBtn" onClick={props.closeModal}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            <input type="text" value={props.url} readOnly />
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={copyUrl}>
                Copy
              </button>
              <button className="cancelBtn" onClick={props.closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
