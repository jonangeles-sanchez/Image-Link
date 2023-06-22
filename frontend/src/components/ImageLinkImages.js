import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { color, motion, useScroll } from "framer-motion";
import folder from "./assets/imagelink_folder.png";
import timage from "./assets/understand.png";
import { getAllLinks } from "../features/imagelink/imagelinkSlice";

function ImageLinkImages(props) {
  const selectedImageLink = props.selectedImageLink;
  const selectedImages = props.selected;

  const dispatch = useDispatch();

  const { links } = useSelector((state) => state.imagelink);
  console.log(links);

  const handleSelect = (e) => {
    const id = e.target.id;
    if (!selectedImageLink) {
      return;
    }
    if (selectedImages.includes(id)) {
      props.select(selectedImages.filter((image) => image !== id));
      e.target.style.border = "none";
    } else {
      props.select([...selectedImages, id]);
      e.target.style.border = "13px solid #FFC947";
    }
  };

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  return (
    <>
      <div>
        <p className="imagelink-collection-name">Chosen ImageLink Title</p>
      </div>
      <div>
        {selectedImages.length > 0 && selectedImageLink && (
          <div className="buttons-actions-image">
            <button className="button-delete-image">
              Delete selected images
            </button>
            <button className="button-delete-image">
              Download selected images
            </button>
          </div>
        )}
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
    </>
  );
}

export default ImageLinkImages;
