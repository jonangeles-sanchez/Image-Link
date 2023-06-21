import { useEffect } from "react";
import Card from "../../components/Card";
import ImageLinkUpload from "../../components/ImageLinkUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NewImageLink() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Card>
      <ImageLinkUpload />
    </Card>
  );
}

export default NewImageLink;
