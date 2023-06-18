import Card from "../../components/Card";
import { motion } from "framer-motion";
import Reveal from "../../components/Reveal";
import moment_1 from "../../components/moment_1.mp4";
import upload from "../../components/upload2.gif";

function index() {
  return (
    <div className="home-container">
      <div className="home-small-text">
        <Reveal delay={2}>
          <h3>The best way to share your best moments across any device</h3>
        </Reveal>
      </div>
      <div className="home-content">
        <div className="home-capture">
          <Reveal delay={3}>
            <Card>
              <video height={"50%"} width={"100%"} autoPlay loop muted>
                {" "}
                <source src={moment_1} type="video/mp4" />
              </video>
            </Card>
          </Reveal>
          <Reveal delay={3.5}>
            <p>
              <span className="word-moment">Capture</span> your moments
            </p>
          </Reveal>
        </div>

        <div className="home-upload">
          <Reveal delay={3.5}>
            <p>
              Easily <span className="word-moment">upload </span>
              and create <span className="word-moment">ImageLinks</span>
            </p>
          </Reveal>
          <Reveal delay={3}>
            <img src={upload} height={"100px"} alt="upload" />
          </Reveal>
        </div>

        <div className="home-upload">
          <Reveal delay={3.5}>
            <p>
              And <span className="word-moment">share </span>
              your <span className="word-moment">ImageLink!</span>
            </p>
          </Reveal>
          <Reveal delay={3}>
            <img src={upload} height={"100px"} alt="upload" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default index;
