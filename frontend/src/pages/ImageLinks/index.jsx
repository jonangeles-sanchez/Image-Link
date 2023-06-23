import ImageLinks from "../../components/ImageLinks";
import ImageLinkImages from "../../components/ImageLinkImages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ImageLinkPage() {
  const [selectedImageLink, setSelectedImageLink] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("--- ImageLinkPage ---");
    console.log("Selected Image Link: ", selectedImageLink);
    console.log("Selected Images: ", selectedImages);
    console.log("--- ImageLinkPage ---");
  }, [selectedImageLink, selectedImages]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div>
      <ImageLinks selected={selectedImageLink} select={setSelectedImageLink} />
      <ImageLinkImages
        selectedImageLink={selectedImageLink}
        selected={selectedImages}
        select={setSelectedImages}
      />
    </div>
  );
}

export default ImageLinkPage;
