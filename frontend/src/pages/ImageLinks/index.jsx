import ImageLinks from "../../components/ImageLinks";
import ImageLinkImages from "../../components/ImageLinkImages";
import { useEffect, useState } from "react";

function ImageLinkPage() {
  const [selectedImageLink, setSelectedImageLink] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    console.log("--- ImageLinkPage ---");
    console.log("Selected Image Link: ", selectedImageLink);
    console.log("Selected Images: ", selectedImages);
    console.log("--- ImageLinkPage ---");
  }, [selectedImageLink, selectedImages]);

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
