import { useEffect, useRef } from "react";
import { useState } from "react";
import { color, motion, useScroll } from "framer-motion";
import folder from "../../components/assets/imagelink_folder.png";
import timage from "../../components/assets/understand.png";

function ImageLinks() {
  const ref = useRef(null);
  const [selectedImageLink, setSelectedImageLink] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleSelect = (e) => {
    const id = e.target.id;
    if (!selectedImageLink) {
      return;
    }
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((image) => image !== id));
      e.target.style.border = "none";
    } else {
      setSelectedImages([...selectedImages, id]);
      e.target.style.border = "13px solid #FFC947";
    }
  };

  const handleSelectImageLink = (e) => {
    const id = e.target.id;
    if (selectedImageLink === id) {
      setSelectedImageLink(null);
      e.target.style.border = "none";
    } else {
      // Only one image link can be selected at a time
      setSelectedImageLink(id);
      e.target.style.border = "13px solid #FFC947";
      // remove border from other image links
      const imageLinks = ref.current.children;
      for (let i = 0; i < imageLinks.length; i++) {
        if (imageLinks[i].children[0].children[0].id !== id) {
          imageLinks[i].children[0].children[0].style.border = "none";
        }
      }
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
          <button className="button-imagelink" onClick={handleSelectImageLink}>
            <img
              className="folder-image"
              src={folder}
              alt="folder"
              id="joe123"
            />
          </button>
          <p className="folder-name">Your mom in a thong</p>
        </li>
        <li className="round-imagelink">
          <button className="button-imagelink" onClick={handleSelectImageLink}>
            <img
              className="folder-image"
              src={folder}
              alt="folder"
              id="bob445"
            />
          </button>
          <p className="folder-name">Your mom in a thong</p>
        </li>
        <li className="round-imagelink">
          <button className="button-imagelink" onClick={handleSelectImageLink}>
            <img
              className="folder-image"
              src={folder}
              alt="folder"
              id="jon90"
            />
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
      {selectedImageLink && (
        <div className="buttons-actions-collection">
          <button className="button-delete-collection">Delete ImageLink</button>
          <button className="button-share-collection">Share ImageLink</button>
          <button className="button-share-collection">Upload photos</button>
        </div>
      )}
      <div>
        {selectedImageLink && selectedImages.length > 0 && (
          <div className="buttons-actions-image">
            <button className="button-delete-image">
              Delete selected images
            </button>
            <button className="button-delete-image">
              Download selected images
            </button>
          </div>
        )}
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
