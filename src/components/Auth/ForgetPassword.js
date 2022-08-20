import { NavLink } from "react-router-dom";
import { useRef } from "react";
import Button from "../UI/Button";
import "./forgetPassword.css";

const ForgetPassword = () => {
    const inputRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredInput = inputRef.current.value;
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAOZUEl1VEtJpHQ36BjgMWcd-VLnjkHSSQ", {
            method: "POST",
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredInput,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return res.json().then((data) => {
                        throw new Error(data.error.message);
                    })
                }
            })
            .then((data) => {
                window.alert("Link sent");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (<div>
        <form onSubmit={submitHandler} className="forgetPassword">
            <label htmlFor="forgetPassword">Enter the email with which you have registered</label>
            <input name="forgetPassword" id="forgetPassword" type="email" placeholder="Email" ref={inputRef} />
            <Button>Send Link</Button>
            <p>
                Already a user ? <NavLink to="/login" className="forget-password">Login</NavLink>
            </p>
        </form>
    </div>)
}

export default ForgetPassword;