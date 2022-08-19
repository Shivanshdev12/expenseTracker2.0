import { Fragment } from "react";
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import { authActions } from "../../store/authSlice";
import "./MainNavigation.css";

const MainNavigation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isToken = localStorage.getItem("token");
    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        window.location.reload();
    }
    return (
        <Fragment>
            <div className="container">
                <ul className="nav">
                    <li>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    {isToken !== null && <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>}
                    <li>
                        <NavLink to="/about">About Us</NavLink>
                    </li>
                    {isToken == null && <li>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </li>}
                    {isToken == null && <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>}
                    {isToken !== null && <li>
                        <Button onClick={logoutHandler} className="logout">Logout</Button>
                    </li>}
                </ul>
            </div>
        </Fragment >
    )
}

export default MainNavigation;