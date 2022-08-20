import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import Button from "../UI/Button";
import Expense from "./Expense";
import "./Home.css";
import "./Expense.css";


const Home = () => {
    const isToken = localStorage.getItem("token");
    const [expense, setExpense] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();
    const items = useSelector(state => state.expense.items);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(cartActions.addExpense({
            expense,
            description,
            category
        }));
    }
    return (
        <div>
            <h1>Welcome to Expense Tracker</h1>
            {isToken && <p>Your profile is incomplete.
                <NavLink to="/profile" className="profile_update">Complete now</NavLink>
            </p>}
            <div className="expense">
                <form onSubmit={submitHandler}>
                    <label htmlFor="expense">Expense:</label>
                    <input type="number" id="expense" placeholder="Enter expense" value={expense} onChange={(e) => setExpense(e.target.value)} required />
                    <label htmlFor="desc">Description:</label>
                    <input type="text" id="desc" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                        required>
                        <option value="">Select an Option</option>
                        <option value="food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Medical">Medical</option>
                        <option value="Others">Others</option>
                    </select>
                    <Button className="btn-primary mb">Add Expense</Button>
                </form>
                {items.map((item) => {
                    <Expense ex={{ expense: item.expense, description: item.description, category: item.category }} />
                })}
            </div>
        </div>
    );
}

export default Home;