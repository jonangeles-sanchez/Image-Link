import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import HorizontalScroll from "react-scroll-horizontal";

import Info from "../../components/Info";

function HomePage() {
  return (
    <div>
      <Parallax pages={2}>
        <ParallaxLayer offset={0} speed={1} factor={0.1}>
          <Info />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={2} factor={0.1}>
          <Info />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default HomePage;
