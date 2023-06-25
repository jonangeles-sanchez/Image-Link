import ImageLinkImages from "../../components/ImageLinkImages";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getImagelinkCode } from "../../features/imagecode/imagecodeSlice";
import { getSingleImageLink } from "../../features/imagelink/imagelinkSlice";

function ImageLink() {
  const { code } = useSelector((state) => state.imagecode);
  const dispatch = useDispatch();
  const codeParam = useParams();
  const id = codeParam.id;
  const [selectedImages, setSelectedImages] = useState([]);
  const { singleLink } = useSelector((state) => state.imagelink);
  console.log("singleLink: ", singleLink);

  useEffect(() => {
    console.log("Code from URL: ", id);
    dispatch(getImagelinkCode({ code: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (code) {
      dispatch(getSingleImageLink(code));
    }
  }, [dispatch, code]);

  return (
    <>
      <ImageLinkImages
        selected={selectedImages}
        page="shared"
        images={singleLink}
      />
    </>
  );
}

export default ImageLink;
