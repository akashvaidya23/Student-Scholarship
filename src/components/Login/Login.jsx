import { useEffect } from "react";
import style from "../Login/login.module.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.title = "Student Sign In";
  }, []);

  const studentLogin = (e) => {
    e.preventDefault();
    alert("login");
  };

  return (
    <div className={style.main}>
      <h3>Student Log In</h3>
      <form id="studentLogin" onSubmit={studentLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Username"
            className={style.input}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <Form.Control
            type="password"
            placeholder="Password"
            className={style.input}
          />
        </div>
        <br />
        <div className={style.button}>
          <Button type="submit" varient="primary">
            Login
          </Button>
        </div>
        <br />
        <p className={style.para}>
          New to this site{" "}
          <Link className={style.link} to={`/student/register`}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
