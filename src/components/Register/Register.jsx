import { Button } from "react-bootstrap";
import style from "./register.module.css";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { registerUser } from "../../services/auth.js";
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/user/userSlice.js";

const Register = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const role = params.get("role");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.title = "Student Create Account";
  }, []);

  const nameRef = useRef();
  const emailRef = useRef();
  const mobileNoRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const studentRegister = async (e) => {
    e.preventDefault();
    setMobileError("");
    setPasswordError("");
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setPasswordError("Password and Confirm Password should be same");
      confirmPasswordRef.current.focus();
      return false;
    }

    if (mobileNoRef.current.value.length != 10) {
      setMobileError("Mobile Number should be 10 digit");
      mobileNoRef.current.focus();
      return false;
    }

    const updatedPayload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      mobile_no: mobileNoRef.current.value,
      username: userNameRef.current.value,
      password: passwordRef.current.value,
      role,
    };
    const response = await registerUser(updatedPayload);
    console.log(response);
    if (response.status == false) {
      setError(response.message);
      return false;
    } else {
      nameRef.current.value = null;
      emailRef.current.value = null;
      mobileNoRef.current.value = null;
      userNameRef.current.value = null;
      passwordRef.current.value = null;
      confirmPasswordRef.current.value = null;
      dispatch(userLogin(response.user));
      navigate("/dashboard");
    }
  };

  return (
    <div className={style.main}>
      <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Sign Up</h3>
      {error ? <p className="error">{error}</p> : ""}
      <form id="studentRegister" onSubmit={studentRegister}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            className={style.input}
            ref={nameRef}
            autoComplete="off"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Email ID"
            name="email"
            id="email"
            className={style.input}
            ref={emailRef}
            autoComplete="off"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="mobile">Mobile No</label>
          <br />
          <Form.Control
            type="number"
            placeholder="Mobile No"
            name="mobile"
            id="mobile"
            className={style.input}
            ref={mobileNoRef}
            autoComplete="off"
            required
            minLength={10}
            size={10}
            maxLength={10}
          />
          <span className="error">{mobileError}</span>
        </div>
        <br />
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            className={style.input}
            ref={userNameRef}
            autoComplete="off"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className={style.input}
            ref={passwordRef}
            autoComplete="off"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="c_password">Confirm Password</label>
          <br />
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="c_password"
            id="c_password"
            className={style.input}
            ref={confirmPasswordRef}
            autoComplete="off"
            required
          />
          <span className="error">{passwordError}</span>
        </div>
        <br />
        <div className={style.button}>
          <Button type="submit" varient="primary">
            Register
          </Button>
        </div>
        <p className={style.para}>
          Already have an account{" "}
          <Link className={style.link} to={`/login/?role=${role}`}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
