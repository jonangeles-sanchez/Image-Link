import { RiCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function Modal(props) {
  const code = useSelector((state) => state.imagecode.code.code);
  const copyUrl = () => {
    const url = props.url + code;
    navigator.clipboard.writeText(url);
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
            <input type="text" value={props.url + code} readOnly />
            <p>Or share this code: {code}</p>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={copyUrl}>
                Copy URL
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
