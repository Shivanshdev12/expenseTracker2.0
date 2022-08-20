import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import "./Profile.css";

const Profile = () => {
    const nameRef = useRef();
    const urlRef = useRef();
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const idToken = localStorage.getItem('token');
    const bgColor = useSelector(state => state.theme.bgColor);
    const profileHandler = (e) => {
        e.preventDefault();
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAOZUEl1VEtJpHQ36BjgMWcd-VLnjkHSSQ";
        const enteredname = nameRef.current.value;
        const enteredUrl = urlRef.current.value;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                idToken: idToken,
                displayName: enteredname,
                photoUrl: enteredUrl,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
        });
    }
    useEffect(() => {
        const profileUrl = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAOZUEl1VEtJpHQ36BjgMWcd-VLnjkHSSQ";
        fetch(profileUrl, {
            method: "POST",
            body: JSON.stringify({
                idToken: idToken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json();
        })
            .then((data) => {
                setName(data.users[0].displayName);
                setPic(data.users[0].photoUrl);
            })
    });
    const verifyHandler = (e) => {
        e.preventDefault();
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAOZUEl1VEtJpHQ36BjgMWcd-VLnjkHSSQ", {
            method: "POST",
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: idToken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                });
            }
        }).then((data) => {
            window.alert("Email sent for verification");
        }).catch((err) => {
            window.alert(err.message);
        })
    }
    return (
        <form onSubmit={profileHandler} className={bgColor === false ? "profile" : "profile profile_dark"}>
            <h2>Contact Details</h2>
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" placeholder="Enter your full name" defaultValue={name} ref={nameRef} />
            <label htmlFor="photo">Profile Photo Url</label>
            <input id="photo" type="url" placeholder="Enter Photo Url" defaultValue={pic} ref={urlRef} />
            <div className="display">
                <Button className="btn-update">Update</Button>
                <Button className="btn-update" onClick={verifyHandler}>Verify Email</Button>
            </div>
        </form>
    )
}

export default Profile;