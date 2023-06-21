import { useRef } from "react";
import { color, motion, useScroll } from "framer-motion";
import folder from "../../components/assets/imagelink_folder.png";

function ImageLinks() {
  const ref = useRef(null);

  return (
    <>
      <div className="imagelink-title">
        <h1 className="imagelink-title">ImageLinks</h1>
      </div>
      <ul ref={ref}>
        <li className="round-imagelink">
          <button className="button-imagelink">
            <img className="folder-image" src={folder} alt="folder" />
          </button>
          <p className="folder-name">Your mom in a thong</p>
        </li>
        <li className="round-imagelink">
          <button className="button-imagelink">
            <img className="folder-image" src={folder} alt="folder" />
          </button>
          <p className="folder-name">Your mom in a thong</p>
        </li>
        <li className="round-imagelink">
          <button className="button-imagelink">
            <img className="folder-image" src={folder} alt="folder" />
          </button>
          <p className="folder-name">Your mom in a thong</p>
        </li>
        <li className="round-imagelink">
          <button className="button-imagelink">
            <img className="folder-image" src={folder} alt="folder" />
          </button>
          <p className="folder-name">Your mom in a thong</p>
        </li>
        <li className="round-imagelink">
          <button className="button-imagelink">
            <img className="folder-image" src={folder} alt="folder" />
          </button>
          <p className="folder-name">Your mom in a thong</p>
        </li>
      </ul>
      <div>
        <div>
          <p className="imagelink-collection-name">Chosen ImageLink Title</p>
        </div>
        <div className="imagelink-collection">
          <div>
            <div>
              <a href="https://www.google.com">
                <img className="imagelink-image" src={folder} alt="folder" />
              </a>
            </div>
          </div>
          <div>
            <div>
              <a href="https://www.google.com">
                <img className="imagelink-image" src={folder} alt="folder" />
              </a>
            </div>
          </div>
          <div>
            <div>
              <a href="https://www.google.com">
                <img className="imagelink-image" src={folder} alt="folder" />
              </a>
            </div>
          </div>
          <div>
            <div>
              <a href="https://www.google.com">
                <img className="imagelink-image" src={folder} alt="folder" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageLinks;
