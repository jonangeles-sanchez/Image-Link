import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { color, motion, useScroll } from "framer-motion";
import folder from "./assets/imagelink_folder.png";
import timage from "./assets/understand.png";
import {
  getAllLinks,
  deleteImageFromImageLink,
} from "../features/imagelink/imagelinkSlice";

function ImageLinkImages(props) {
  const selectedImageLink = props.selectedImageLink;
  const selectedImages = props.selected;

  const dispatch = useDispatch();

  const { links } = useSelector((state) => state.imagelink);
  //console.log(links);

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

  const handleDeleteSelected = () => {
    if (!selectedImageLink) {
      return;
    }
    dispatch(
      deleteImageFromImageLink({
        id: selectedImageLink,
        imageId: selectedImages,
      })
    );
  };

  //   useEffect(() => {
  //     console.log(selectedImages);
  //   }, [selectedImages]);

  return (
    <>
      <div>
        <p className="imagelink-collection-name">Chosen ImageLink Title</p>
      </div>
      <div>
        {selectedImages.length > 0 && selectedImageLink && (
          <div className="buttons-actions-image">
            <button
              className="button-delete-image"
              onClick={handleDeleteSelected}
            >
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
          {(() => {
            const imagelink = links.find(
              (link) => link._id === selectedImageLink
            );
            if (!imagelink) {
              return null;
            }
            console.log(imagelink);
            return imagelink.images.map((image) => (
              <div className="imagelink-image">
                <img
                  className="imagelink-image"
                  src={`data:image/png;base64,${image.img.data}`}
                  alt="imagelink"
                  id={image._id}
                  onClick={handleSelect}
                />
              </div>
            ));
          })()}
        </div>
      </div>
    </>
  );
}

export default ImageLinkImages;
