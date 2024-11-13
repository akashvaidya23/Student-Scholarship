import { Button } from "react-bootstrap";
import style from '../Register/Register.module.css';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
    useEffect(() => {
        document.title = "Student Create Account";
    }, []);

    const studentRegister = (e) => {
        e.preventDefault();
        alert('Register');
    }

    return (
        <div className={style.main}>
            <h3>Create Account</h3>
            <form id="studentRegister" onSubmit={studentRegister}>
                <div>
                    <label htmlFor="name">Name</label>
                    <br />
                    <Form.Control type="text" placeholder="Name of the Student" name="name" id="name" className={style.input} />
                </div>
                <br />
                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <Form.Control type="text" placeholder="Email ID of the Student text" name="email" id="email" className={style.input} />
                </div>
                <br />
                <div>
                    <label htmlFor="mobile">Mobile No</label>
                    <br />
                    <Form.Control type="text" placeholder="Mobile No of the Student" name="mobile" id="mobile" className={style.input} />
                </div>
                <br />
                <div>
                    <label htmlFor="username">Username</label>
                    <br />
                    <Form.Control type="text" placeholder="Username of the Student" name="username" id="username" className={style.input} />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <Form.Control type="text" placeholder="Enter Password" name="password" id="password" className={style.input} />
                </div>
                <br />
                <div>
                    <label htmlFor="c_password">Confirm Password</label>
                    <br />
                    <Form.Control type="text" placeholder="Confirm Password" name="c_password" id="c_password" className={style.input} />
                </div>
                <br />
                <div className={style.button}>
                    <Button type="submit" varient="primary">Register</Button>
                    <Button variant="success" as={Link} to="/login">Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default Register;