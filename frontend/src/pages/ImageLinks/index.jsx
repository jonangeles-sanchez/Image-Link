import { useEffect, useRef } from "react";
import { useState } from "react";
import { color, motion, useScroll } from "framer-motion";
import folder from "../../components/assets/imagelink_folder.png";
import timage from "../../components/assets/understand.png";

function ImageLinks() {
  const ref = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleSelect = (e) => {
    const id = e.target.id;
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((image) => image !== id));
      e.target.style.border = "none";
    } else {
      setSelectedImages([...selectedImages, id]);
      e.target.style.border = "13px solid #FFC947";
    }
  };

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

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
              <img
                className="imagelink-image"
                src={folder}
                alt="folder"
                id="abc123"
                onClick={handleSelect}
              />
            </div>
          </div>
          <div>
            <div>
              <img
                className="imagelink-image"
                src={folder}
                alt="folder"
                id="xyz321"
                onClick={handleSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageLinks;
