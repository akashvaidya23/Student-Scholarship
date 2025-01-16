import Button from "react-bootstrap/Button";
import style from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkIfLoggedIn } from "../../services/auth";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
    const checkLoginStatus = async () => {
      const user = await checkIfLoggedIn();
      if (user) {
        navigate("/dashboard");
      }
    };
    checkLoginStatus();
  }, [navigate]);

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
            to={"/login/?role=scholarship officer"}
            variant="outline-primary"
          >
            Scholarship Officer
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
