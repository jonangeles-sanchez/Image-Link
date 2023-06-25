import ImageLinkImages from "../../components/ImageLinkImages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getImagelinkCode } from "../../features/imagecode/imagecodeSlice";

function ImageLink() {
  const codeParam = useParams();
  const id = codeParam.id;
  const dispatch = useDispatch();
  const [selectedImageLink, setSelectedImageLink] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  //const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Code from URL: ", id);
    dispatch(getImagelinkCode({ code: id }));
  }, [dispatch, id]);

  return (
    <>
      <ImageLinkImages selected={selectedImages} />
    </>
  );
}

export default ImageLink;
