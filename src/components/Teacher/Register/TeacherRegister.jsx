import { Button } from "react-bootstrap";
import style from "./TeacherRegister.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const TeacherRegister = () => {
  useEffect(() => {
    document.title = "Teacher Create Account";
  }, []);

  const TeacherRegister = (e) => {
    e.preventDefault();
    alert("Register");
  };

  return (
    <div className={style.main}>
      <h3>Teacher Sign Up</h3>
      <form id="TeacherRegister" onSubmit={TeacherRegister}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Name of the Teacher"
            name="name"
            id="name"
            className={style.input}
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Email ID of the Teacher"
            name="email"
            id="email"
            className={style.input}
          />
        </div>
        <br />
        <div>
          <label htmlFor="mobile">Mobile No</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Mobile No of the Teacher"
            name="mobile"
            id="mobile"
            className={style.input}
          />
        </div>
        <br />
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Username of the Teacher"
            name="username"
            id="username"
            className={style.input}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Enter Password"
            name="password"
            id="password"
            className={style.input}
          />
        </div>
        <br />
        <div>
          <label htmlFor="c_password">Confirm Password</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Confirm Password"
            name="c_password"
            id="c_password"
            className={style.input}
          />
        </div>
        <br />
        <div className={style.button}>
          <Button type="submit" varient="primary">
            Register
          </Button>
        </div>
        <p className={style.para}>
          Already have an account{" "}
          <Link className={style.link} to={`/teacher/login`}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default TeacherRegister;
