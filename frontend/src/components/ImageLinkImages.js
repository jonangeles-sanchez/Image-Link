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
  getImage,
} from "../features/imagelink/imagelinkSlice";

function ImageLinkImages(props) {
  const selectedImageLink = props.selectedImageLink;
  const selectedImages = props.selected;
  const [imageLink, setImageLinks] = useState([]);

  const dispatch = useDispatch();

  const { links } = useSelector((state) => state.imagelink);
  //console.log(links);

  const [imageUrl, setImageUrl] = useState([]);

  let imagelink = null;
  if (props.page !== "shared") {
    imagelink = links.find((link) => link._id === selectedImageLink);
  } else {
    imagelink = props.images;
    console.log("imagelink: " + JSON.stringify(imagelink));
    //loadSharedImages(imagelink);
  }

  const handleSelect = (e) => {
    const id = e.target.id;
    if (!selectedImageLink && props.page !== "shared") {
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

  const handleSelectAll = () => {
    if (!selectedImageLink && props.page !== "shared") {
      return;
    }
    const allImages = document.querySelectorAll(".imagelink-image");
    const allImageIds = Array.from(allImages).map((image) => image.id);

    if (selectedImages.length === allImageIds.length) {
      props.select([]);
      allImages.forEach((image) => (image.style.border = "none"));
    } else {
      props.select(allImageIds);
      allImages.forEach((image) => (image.style.border = "13px solid #FFC947"));
    }
  };

  /*
  const handleDownloadSelected = () => {
    if (!imagelink) {
      return;
    }

    selectedImages.forEach((imageId, index) => {
      const image = imagelink.images.find((img) => img._id === imageId);
      if (image) {
        const link = document.createElement("a");
        const imageFormat = image.img.contentType.split("/")[1];
        // Obtain the image name from the image itself
        const imageName = image.name;
        link.href = `data:${image.img.contentType};base64,${image.img.data}`;
        link.download = imageName;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
      }
    });
  };
  */

  const handleDownloadSelected = () => {
    if (!imagelink) {
      return;
    }

    // For each image, go to their src link to download
    selectedImages.forEach((imageId, index) => {
      const image = imagelink.images.find((img) => img._id === imageId);
      if (image) {
        const link = document.createElement("a");
        const imageFormat = image.img.contentType.split("/")[1];
        // Obtain the image name from the image itself
        const imageName = image.name;
        link.href = imageUrl[imagelink.images.indexOf(image)];
        link.download = imageName;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
      }
    });
  };

  async function loadImages(selectedImageLink) {
    if (!selectedImageLink) {
      return;
    }
    const imageLinkArray = links.find(
      (link) => link._id === selectedImageLink
    ).images;

    // Append the image to the image array
    const imageArray = [];
    for (let i = 0; i < imageLinkArray.length; i++) {
      const image = await dispatch(
        getImage({
          id: selectedImageLink,
          imageKey: imageLinkArray[i].img.data,
        })
      );
      imageArray.push(image.payload);
      console.log("Image string: " + JSON.stringify(image).payload);
    }

    setImageUrl(imageArray);
  }

  async function loadSharedImages(imageLink) {
    if (!imageLink) {
      return;
    }
    const imageLinkArray = imageLink.images;

    // Append the image to the image array
    const imageArray = [];
    for (let i = 0; i < imageLinkArray.length; i++) {
      const image = await dispatch(
        getImage({
          id: imageLink._id,
          imageKey: imageLinkArray[i].img.data,
        })
      );
      imageArray.push(image.payload);
      console.log("Image string: " + JSON.stringify(image).payload);
    }

    setImageUrl(imageArray);
  }

  useEffect(() => {
    if (props.page !== "shared") {
      loadImages(selectedImageLink);
    } else {
      console.log("props.images: " + JSON.stringify(props.images));
      loadSharedImages(props.images);
    }
  }, [selectedImageLink, props.images]);

  return (
    <>
      <div>
        <p className="imagelink-collection-name">Chosen ImageLink Title</p>
      </div>
      <div>
        {selectedImages.length > 0 && selectedImageLink && (
          <div className="buttons-actions-image">
            {props.page !== "shared" && (
              <button className="button-delete-image">
                Delete selected images
              </button>
            )}
          </div>
        )}

        {props.page === "shared" && (
          <button className="button-delete-image" onClick={handleSelectAll}>
            Select All
          </button>
        )}

        {selectedImages.length > 0 && (
          <button
            className="button-delete-image"
            onClick={handleDownloadSelected}
          >
            Download selected images
          </button>
        )}
      </div>
      <div className="imagelink-collection">
        <div>
          {(() => {
            let imagelink = null;
            if (props.page !== "shared") {
              imagelink = links.find((link) => link._id === selectedImageLink);
            } else {
              imagelink = props.images;
            }
            if (!imagelink) {
              return null;
            }
            console.log("Current:", imagelink);
            return (
              imagelink.images &&
              imagelink.images.map((image) => (
                <div className="image-div">
                  <img
                    className="imagelink-image"
                    src={imageUrl[imagelink.images.indexOf(image)]}
                    alt={image.name}
                    id={image._id}
                    onClick={handleSelect}
                    key={imagelink.images.indexOf(image)}
                  />
                </div>
              ))
            );
          })()}
        </div>
      </div>
    </>
  );
}

export default ImageLinkImages;
