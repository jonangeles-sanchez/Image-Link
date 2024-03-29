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
import ImageLinkNew from "../../components/ImageLinkNew";
import SelectImageLink from "../../components/SelectImageLink";

function NewImageLink() {
  const { user } = useSelector((state) => state.auth);
  const { links } = useSelector((state) => state.imagelink);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLink, setSelectedLink] = useState(null);
  const [newLink, setNewLink] = useState(false);

  useEffect(() => {
    async function dispatchGetLinks() {
      await dispatch(getAllLinks());
    }
    if (!user) {
      navigate("/login");
    }
    dispatchGetLinks();
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (links && links.length > 0) setSelectedLink(links[0]._id);
  }, [links]);

  const handleSelectLink = (e) => {
    // Use id attribute to get the id of the selected link
    const selectedId = e.target.options[e.target.selectedIndex].id;
    setSelectedLink(selectedId);
  };

  const handleNewImageLink = () => {
    setNewLink(true);
  };

  const handleCancel = () => {
    setNewLink(false);
  };

  return (
    <div className="upload-section">
      <Card>
        <SelectImageLink
          links={links}
          handleSelectLink={handleSelectLink}
          handleNewImageLink={handleNewImageLink}
        />
      </Card>

      <Card>
        {!newLink ? (
          <ImageLinkUpload currLink={selectedLink} />
        ) : (
          <ImageLinkNew
            handleCancel={handleCancel}
            user={user}
            handleNewImageLink={handleNewImageLink}
            selectedLink={selectedLink}
          />
        )}
      </Card>
    </div>
  );
}

export default NewImageLink;
