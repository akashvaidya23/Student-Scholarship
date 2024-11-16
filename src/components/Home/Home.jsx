import Button from "react-bootstrap/Button";
import style from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h4 className={style.heading}>I AM A</h4>
      <div className={style.home}>
        <Button as={Link} to={"student/login"} variant="secondary">
          Student
        </Button>
        <Button as={Link} to={"teacher/login"} variant="primary">
          Teacher
        </Button>
        <Button variant="success">Admin</Button>
      </div>
    </>
  );
};

export default Home;
