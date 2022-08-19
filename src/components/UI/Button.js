import React from "react";
import "./Button.css";

const Button = (props) => {
    const classes = "btn " + props.className;
    return (<button className={classes} onClick={props.onClick}>{props.children}</button>)
}

export default Button;