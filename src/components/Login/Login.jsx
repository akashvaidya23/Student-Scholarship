import { useEffect } from 'react';
import style from '../Login/login.module.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


const Login = () => {
    useEffect(() => {
        document.title = "Student Sign In";
    }, []);

    const studentLogin = (e) => {
        e.preventDefault();
        alert('login');
    }

    return (
        <div className={style.main}>
            <h3>Sign In</h3>
            <form id="studentLogin" onSubmit={studentLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <br />
                    <Form.Control type="text" placeholder="Username" className={style.input} />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <Form.Control type="password" placeholder="Password" className={style.input} />
                </div>
                <br />
                <div className={style.button}>
                    <Button type="submit" varient="primary">Login</Button>
                    <Button variant="danger" as={Link} to={`/register`}>Sign Up</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;