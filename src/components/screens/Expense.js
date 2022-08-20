import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import Button from "../UI/Button";


const Expense = (props) => {
    const { expense, description, category } = props.ex;
    console.log(expense, description, category);

    return (
        <Fragment>

        </Fragment >
    )
}

export default Expense;