import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { color, motion, useScroll } from "framer-motion";
import folder from "./assets/imagelink_folder.png";
import timage from "./assets/understand.png";
import { getAllLinks } from "../features/imagelink/imagelinkSlice";

function ImageLinks(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { links } = useSelector((state) => state.imagelink);
  console.log(links);
  const ref = useRef(null);
  const selectedImageLink = props.selected;

  const handleSelectImageLink = (e) => {
    const id = e.target.id;
    if (selectedImageLink === id) {
      props.select(null);
      e.target.style.border = "none";
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
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getAllLinks());
  }, [dispatch, navigate, user]);

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
    </>
  );
}

export default ImageLinks;
