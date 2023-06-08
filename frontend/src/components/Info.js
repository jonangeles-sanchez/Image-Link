import Card from "./Card";
import classes from "./Info.module.css";

function Info() {
  return (
    <>
      <section className={classes.info}>
        <Card>
          <img src="https://picsum.photos/200/300" alt="info" />
        </Card>
      </section>

      <h1>Title</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.{" "}
      </p>
    </>
  );
}

export default Info;
