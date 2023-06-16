import Card from "./Card";
import classes from "./Info.module.css";
import moment_1 from "./moment_1.mp4";

function Info() {
  return (
    <>
      <section className={classes.info}>
        <Card>
          <video height="900" autoPlay loop muted>
            <source src={moment_1} type="video/mp4" />
          </video>
        </Card>

        <div className={classes.row}>
          <h1>A solution to cross-device content sharing.</h1>
          <p>
            ImageLink is a web application that allows users to share your
            greatest moments across any device.
          </p>
        </div>
      </section>
    </>
  );
}

export default Info;
