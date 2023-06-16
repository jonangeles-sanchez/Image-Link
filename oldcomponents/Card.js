import classes from "./Card.module.css";
function Card(props) {
  return (
    <div className={classes.card}>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;
