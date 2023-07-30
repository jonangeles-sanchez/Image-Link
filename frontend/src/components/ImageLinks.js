import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { color, motion, useScroll } from "framer-motion";
import folder from "./assets/imagelink_folder.png";
import timage from "./assets/understand.png";
import {
  getAllLinks,
  deleteImageLink,
} from "../features/imagelink/imagelinkSlice";
import { nanoid } from "nanoid";
import { createImageLinkCode } from "../features/imagecode/imagecodeSlice";

function ImageLinks(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { links } = useSelector((state) => state.imagelink);
  //console.log(links);
  const ref = useRef(null);
  const selectedImageLink = props.selected;
  const [code, setCode] = useState(null);

  const handleSelectImageLink = (e) => {
    const id = e.target.id;
    if (selectedImageLink === id) {
      props.select(null);
      e.target.style.border = "none";
      props.setImageLinkTitle(null);
    } else {
      // Only one image link can be selected at a time
      props.select(id);
      e.target.style.border = "13px solid #FFC947";
      // remove border from other image links
      const imageLinks = ref.current.children;
      for (let i = 0; i < imageLinks.length; i++) {
        if (imageLinks[i].children[0].children[0].id !== id) {
          imageLinks[i].children[0].children[0].style.border = "none";
        }
      }
      props.setImageLinkTitle(e.target.title);
    }
  };

  const handleDeleteImageLink = () => {
    if (!selectedImageLink) {
      alert("Please select an image collection to delete");
      return;
    }
    dispatch(deleteImageLink(selectedImageLink));
    props.select(null);
  };

  const handleShareImageLink = () => {
    if (!selectedImageLink) {
      alert("Please select an image collection to share");
      return;
    }
    // setCode(dispatch(createImageLinkCode({ imagelinkid: selectedImageLink })));
    // props.openModal();
    handleShare(props.openModal);
  };

  const handleShare = async (callback) => {
    try {
      const codeResponse = await dispatch(
        createImageLinkCode({ imagelinkid: selectedImageLink })
      );

      if (codeResponse.payload && codeResponse.payload.code) {
        const code = codeResponse.payload.code;
      } else {
        console.log("Code not found in the response.");
      }

      callback();
    } catch (error) {
      console.error("Error in handleShare:", error);
    }
  };

  useEffect(() => {
    console.log(code);
  }, [code]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getAllLinks());
  }, [dispatch, navigate, user]);

  return (
    <>
      <div className="imagelink-title">
        <h1 className="imagelink-title">Image Collections</h1>
      </div>
      <ul ref={ref}>
        {links.map((link) => (
          <li className="round-imagelink">
            <button className="button-imagelink">
              <img
                className="folder-image"
                src={folder}
                alt="folder"
                id={link._id}
                title={link.title}
                onClick={handleSelectImageLink}
              />
            </button>
            <p className="folder-name">{link.title}</p>
          </li>
        ))}
      </ul>
      {selectedImageLink && (
        <div className="buttons-actions-collection">
          <button
            className="button-delete-collection"
            onClick={handleDeleteImageLink}
          >
            Delete Collection
          </button>
          <button
            className="button-share-collection"
            onClick={handleShareImageLink}
          >
            Create ImageLink Code
          </button>
          <button className="button-share-collection">
            <NavLink to="/newimagelink" className="button-share-collection">
              Upload Photos To Collection
            </NavLink>
          </button>
        </div>
      )}
    </>
  );
}

export default ImageLinks;
