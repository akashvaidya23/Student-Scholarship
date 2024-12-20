import { useEffect, useRef, useState } from "react";
import style from "./AdminLogin.module.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/auth";

/**
 * AdminLogin component
 * @returns {JSX.Element} Form for admin to log in
 */
const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Sign In";
  }, []);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const studentLogin = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      role: "admin",
    };
    const response = await login(payload);
    console.log(response);

    if (response.status == false) {
      setError(response.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className={style.main}>
      <h3>Admin Log In</h3>
      {error ? <p className="error">{error}</p> : ""}
      <form id="studentLogin" onSubmit={studentLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Username"
            className={style.input}
            ref={usernameRef}
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
            ref={passwordRef}
          />
        </div>
        <br />
        <div className={style.button}>
          <Button type="submit" varient="primary">
            Login
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default AdminLogin;
