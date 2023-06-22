import ImageLinks from "../../components/ImageLinks";
import ImageLinkImages from "../../components/ImageLinkImages";
import { useState } from "react";

function ImageLinkPage() {
  const [selectedImageLink, setSelectedImageLink] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

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
