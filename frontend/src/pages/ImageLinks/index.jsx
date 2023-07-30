import ImageLinks from "../../components/ImageLinks";
import ImageLinkImages from "../../components/ImageLinkImages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

function ImageLinkPage() {
  const [selectedImageLink, setSelectedImageLink] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [url, setUrl] = useState("http://localhost:3000/imagelink/");
  const [imageLinkTitle, setImageLinkTitle] = useState("");

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

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ImageLinks
        selected={selectedImageLink}
        select={setSelectedImageLink}
        openModal={handleOpenModal}
        setImageLinkTitle={setImageLinkTitle}
        setUrl={setUrl}
      />
      <ImageLinkImages
        selectedImageLink={selectedImageLink}
        selected={selectedImages}
        select={setSelectedImages}
        imageLinkTitle={imageLinkTitle}
      />
      {isOpen && <Modal closeModal={handleCloseModal} url={url} />}
    </div>
  );
}

export default ImageLinkPage;
