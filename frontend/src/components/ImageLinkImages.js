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
import LoadingGif from "./LoadingGif";

function ImageLinkImages(props) {
  const selectedImageLink = props.selectedImageLink;
  const selectedImages = props.selected;
  const [imageLink, setImageLinks] = useState([]);
  const [imageLinkTitle, setImageLinkTitle] = useState("");
  const dispatch = useDispatch();
  const [operated, setOperated] = useState(false);

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

    // Check if the image is already selected
    if (selectedImages.includes(id)) {
      props.select(selectedImages.filter((image) => image !== id));
      e.target.style.border = "none";
    } else {
      props.select([...selectedImages, id]);
      // Add .selected class to the image
      e.target.classList.add("selected");
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
      //allImages.forEach((image) => (image.style.border = "13px solid #FFC947"));
      // Add .selected class to the image
      allImages.forEach((image) => image.classList.add("selected"));
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedImageLink && !selectedImages) {
      return;
    }

    const imageLinkArray = [];
    const allImages = document.querySelectorAll(".imagelink-image");
    allImages.forEach((image) => {
      if (image.classList.contains("selected")) {
        imageLinkArray.push(image);
      }
      console.log("imageLinkArray: ", imageLinkArray);
    });

    console.log("imageLinkArray: ", imageLinkArray);

    // Loop through and delete them
    let imageUrlsCopy = [...imageUrl];
    for (let i = 0; i < imageLinkArray.length; i++) {
      const image = imageLinkArray[i];
      const id = image.id;
      const imageLink = links.find((link) => link._id === selectedImageLink);
      const imageLinkArrayQueried = imageLink.images;
      const imageKey = imageLinkArrayQueried.find(
        (image) => image._id === id
      ).img;
      await dispatch(
        deleteImageFromImageLink({
          id: selectedImageLink,
          imageKey: imageKey.data,
          imageId: id,
        })
      );
      console.log("Request: ", {
        id: selectedImageLink,
        imageKey: imageKey.data,
        imageId: id,
      });
      // Remove the image from imageUrls
      imageUrlsCopy.splice(imageUrlsCopy.indexOf(image.src), 1);
    }

    setImageUrl(imageUrlsCopy);
    setOperated(true);
  };

  const handleDownloadSelected = async () => {
    if (!selectedImageLink && !selectedImages) {
      return;
    }

    // store all images with the class 'selected' in an array
    const imageLinkArray = [];
    const allImages = document.querySelectorAll(".imagelink-image");
    allImages.forEach((image) => {
      if (image.classList.contains("selected")) {
        imageLinkArray.push(image);
      }
      console.log("imageLinkArray: ", imageLinkArray);
    });

    console.log("imageLinkArray: ", imageLinkArray);

    // Loop through and go to their src url
    for (let i = 0; i < imageLinkArray.length; i++) {
      const image = imageLinkArray[i];
      const link = image.src;
      const a = document.createElement("a");
      a.href = link;
      a.download = "image";
      document.body.appendChild(a);
      a.click();
      console.log("Downloaded image: ", link);

      // Wait for the download to finish before continuing to the next iteration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Remove the link from the DOM to clean up
      document.body.removeChild(a);
    }
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
    setOperated(false);
    if (props.page !== "shared") {
      loadImages(selectedImageLink);
    } else {
      console.log("props.images: " + JSON.stringify(props.images));
      loadSharedImages(props.images);
    }
  }, [selectedImageLink, props.images, operated]);

  const imageLinkIsLoading = useSelector((state) => state.imagelink.isLoading);
  const imageCodeIsLoading = useSelector((state) => state.imagecode.isLoading);

  if (imageLinkIsLoading || imageCodeIsLoading) {
    return <LoadingGif />;
  }

  return (
    <>
      <div className="image-link-images">
        <p className="image-link-title">{props.imageLinkTitle}</p>
      </div>
      <div className="image-link-actions">
        {selectedImages.length > 0 && selectedImageLink && (
          <div className="buttons-actions">
            {props.page !== "shared" && (
              <button
                className="buttons-actions button-delete-image"
                onClick={handleDeleteSelected}
              >
                Delete selected images
              </button>
            )}
          </div>
        )}

        {props.page === "shared" && (
          <button
            className="buttons-actions button-delete-image"
            onClick={handleSelectAll}
          >
            Select All
          </button>
        )}

        {selectedImages.length > 0 && (
          <button
            className="buttons-actions button-delete-image"
            onClick={handleDownloadSelected}
          >
            Download selected images
          </button>
        )}
      </div>
      <div className="image-link-grid">
        {(() => {
          if (!imagelink) {
            return null;
          }
          console.log("Current:", imagelink);
          return (
            imagelink.images &&
            imagelink.images.map((image) => (
              <div className="image-div">
                <img
                  className={`imagelink-image ${
                    selectedImages.includes(image._id) ? "selected" : ""
                  }`}
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
    </>
  );
}

export default ImageLinkImages;
