import { useEffect } from "react";
import Card from "../../components/Card";
import ImageLinkUpload from "../../components/ImageLinkUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllLinks } from "../../features/imagelink/imagelinkSlice";
import { useState } from "react";

function NewImageLink() {
  const { user } = useSelector((state) => state.auth);
  const { links } = useSelector((state) => state.imagelink);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLink, setSelectedLink] = useState(null);
  const [newLink, setNewLink] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getAllLinks());
  }, [user, newLink, navigate, dispatch]);

  const handleSelectLink = (e) => {
    setSelectedLink(e.target.value);
    console.log(`selected link: ${e.target.value}`);
  };

  const handleNewImageLink = () => {
    setNewLink(true);
  };

  const handleCancel = () => {
    setNewLink(false);
  };

  const handleCreate = () => {
    setNewLink(false);
  };

  return (
    <div className="upload-section">
      <Card>
        {!newLink ? (
          <ImageLinkUpload currLink={selectedLink} />
        ) : (
          <>
            <form className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" />
              <label htmlFor="description">Description</label>
              <input type="text" name="description" id="description" />
              <button
                onSubmit={handleCreate}
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
                return <option key={link.title}>{link.title}</option>;
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
