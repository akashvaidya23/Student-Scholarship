import Button from "react-bootstrap/Button";
import style from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className={style.home}>
        <h4 className={style.heading}>I AM A</h4>
        <div className={style.buttonRow}>
          <Button
            as={Link}
            to={"/login/?role=student"}
            variant="outline-primary"
          >
            Student
          </Button>
          <Button
            as={Link}
            to={"/login/?role=teacher"}
            variant="outline-primary"
          >
            Teacher
          </Button>
          <Button as={Link} to={"/login/?role=admin"} variant="outline-primary">
            Admin
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
