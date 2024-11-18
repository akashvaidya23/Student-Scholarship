import { useEffect } from "react";
import style from "./AdminLogin.module.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const AdminLogin = () => {
    useEffect(() => {
        document.title = "Admin Sign In";
    }, []);

    const studentLogin = (e) => {
        e.preventDefault();
        alert("login");
    };

    return (
        <div className={style.main}>
            <h3>Admin Log In</h3>
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
            </form>
        </div>
    );
};

export default AdminLogin;
