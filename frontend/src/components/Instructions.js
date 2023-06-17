import Card from "./Card";
import classes from "./Instructions.module.css";
import moment_1 from "./moment_1.mp4";

function Info() {
  return (
    <>
      <section className={classes.row}>
        <Card>
          <h1>How do I use it?</h1>
          <h3>Simple!</h3>
          <p>If you want to upload images, create an account.</p>
        </Card>
      </section>
    </>
  );
}

export default Info;
