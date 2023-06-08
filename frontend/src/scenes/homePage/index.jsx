import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Info from "../../components/Info";
import Instructions from "../../components/Instructions";

function HomePage() {
  return (
    <div>
      <Info />
      <Info />
      <Instructions />
    </div>
  );
}

export default HomePage;
