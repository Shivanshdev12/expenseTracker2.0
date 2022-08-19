import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import "./Signup.css";
import { authActions } from "../../store/authSlice";

const SignUp = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const confirmPassword = confirmRef.current.value;
        dispatch(authActions.signup(enteredEmail));
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOZUEl1VEtJpHQ36BjgMWcd-VLnjkHSSQ";
        if (enteredPassword === confirmPassword) {
            fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.ok)
                    return res.json();
            }).then((data) => {
                localStorage.setItem("token", data.idToken);
                localStorage.setItem("email", enteredEmail);
                history.replace("/home");
                window.location.reload();
            }).catch(err => window.alert(err.message));
        }
    }
    return (<div>
        <form className="form_signup" onSubmit={submitHandler}>
            <h2>SignUp</h2>
            <label htmlFor="Email">Email</label>
            <input type="text" name="Email" placeholder="Email" ref={emailRef} required />
            <label htmlFor="Password">Password</label>
            <input type="password" name="Password" placeholder="Password" ref={passwordRef} required />
            <label htmlFor="Confirm">Confirm Password</label>
            <input type="password" name="Confirm" placeholder="Confirm Password" ref={confirmRef} required />
            <Button className="btn btn-primary signup">SignUp</Button>
            <h4>Already have an account ? Login</h4>
        </form>
    </div>)
}

export default SignUp;