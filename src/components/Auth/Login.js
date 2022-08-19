import { useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import Button from "../UI/Button";
import "./Login.css";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        dispatch(authActions.login(enteredEmail));
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOZUEl1VEtJpHQ36BjgMWcd-VLnjkHSSQ";
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((data) => {
            localStorage.setItem("token", data.idToken);
            localStorage.setItem("email", enteredEmail);
            history.replace("/home");
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <form className="form_login" onSubmit={submitHandler}>
            <h2>Login</h2>
            <label htmlFor="Email">Email</label>
            <input type="text" name="Email" placeholder="Email" ref={emailRef} required />
            <label htmlFor="Password">Password</label>
            <input type="password" name="Password" placeholder="Password" ref={passwordRef} required />
            <div className="auth">
                <Button>Login</Button>
            </div>
            <NavLink to="/forget-password" className="forget-password">
                Forget Password
            </NavLink>
            <h4>Don't have an account ? SignUp</h4>
        </form>)
}

export default Login;