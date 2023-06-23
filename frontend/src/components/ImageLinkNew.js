import { useEffect } from "react";
import Card from "./Card";
import ImageLinkUpload from "./ImageLinkUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllLinks,
  createImageLink,
} from "../features/imagelink/imagelinkSlice";
import { useState } from "react";

function ImageLinkNew(props) {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    user: props.user._id,
    title: "",
    description: "",
    images: [], // Keep empty for now
  });
  const { title, description } = formFields;
  const handleCreate = () => {
    props.handleCancel(); // Sets the state newImageLink to false
    dispatch(createImageLink(formFields));
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);
  return (
    <>
      <form className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="Enter title"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          placeholder="Enter description"
          onChange={handleChange}
        />
        <button onClick={handleCreate} className="button-share-collection">
          Create
        </button>
        <button
          onClick={props.handleCancel}
          className="button-share-collection cancel"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default ImageLinkNew;
