import { useEffect } from "react";
import Card from "../../components/Card";
import ImageLinkUpload from "../../components/ImageLinkUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllLinks,
  createImageLink,
} from "../../features/imagelink/imagelinkSlice";
import { useState } from "react";

function NewImageLink() {
  const { user } = useSelector((state) => state.auth);
  const { links } = useSelector((state) => state.imagelink);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLink, setSelectedLink] = useState(null);
  const [newLink, setNewLink] = useState(false);
  const [formFields, setFormFields] = useState({
    user: user._id,
    title: "",
    description: "",
    images: [], // Keep empty for now
  });

  const { title, description } = formFields;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getAllLinks());
  }, [user, navigate, dispatch]);

  const handleSelectLink = (e) => {
    // Use id attribute to get the id of the selected link
    const selectedId = e.target.options[e.target.selectedIndex].id;
    console.log(selectedId);
    setSelectedLink(selectedId);
  };

  const handleNewImageLink = () => {
    setNewLink(true);
  };

  const handleCancel = () => {
    setNewLink(false);
  };

  const handleCreate = () => {
    setNewLink(false);
    dispatch(createImageLink(formFields));
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  return (
    <div className="upload-section">
      <Card>
        {!newLink ? (
          <ImageLinkUpload currLink={selectedLink} />
        ) : (
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
              <button
                onClick={handleCreate}
                className="button-share-collection"
              >
                Create
              </button>
              <button
                onClick={handleCancel}
                className="button-share-collection cancel"
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </Card>
      <Card>
        {links.length > 0 ? (
          <>
            <p>Select which link to upload to</p>
            <select className="imagelink-dropdown" onChange={handleSelectLink}>
              {links.map((link) => {
                return (
                  <option key={link.title} id={link._id}>
                    {link.title}
                  </option>
                );
              })}
            </select>
            <p>Or create a new imagelink!</p>
            <button
              className="button-share-collection"
              onClick={handleNewImageLink}
            >
              Create new imagelink
            </button>
          </>
        ) : (
          <p>No imagelinks found</p>
        )}
      </Card>
    </div>
  );
}

export default NewImageLink;
