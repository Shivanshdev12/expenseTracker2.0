import React, { useEffect, useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { themeActions } from "../../store/themeSlice";
import DownloadCSV from "../screens/DownloadCSV";
import Button from "../UI/Button";
import "./Home.css";


const Home = (props) => {
    const isToken = localStorage.getItem("token");
    const [expense, setExpense] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();
    const items = useSelector(state => state.expense.items);
    const totalExpense = useSelector(state => state.expense.totalExpense);
    const bgColor = useSelector(state => state.theme.bgColor);

    let username = localStorage.getItem("email") || " ";
    let t = "";
    for (let i = 0; i < username.length; i++) {
        if (username[i] === '.' || username[i] === '@') {
            continue;
        }
        else {
            t += username[i];
        }
    }
    username = t;

    useEffect(() => {
        fetch(`https://expensetracker-16e15-default-rtdb.firebaseio.com/expenses/${username}.json`)
            .then((res) => {
                if (!res.ok) {
                    console.log("Something went wrong!");
                }
                else {
                    return res.json();
                }
            }).then((data) => {
                let localItem = [];
                let localtotalExpense = 0;
                for (let [key, value] of Object.entries(data)) {
                    localItem.push({ key, ...value });
                    localtotalExpense = localtotalExpense + (+value.expense);
                }
                dispatch(cartActions.replaceExpense({
                    items: localItem || [],
                    totalExpense: localtotalExpense
                }));
            });
    }, []);

    const sendData = async (expenses) => {
        const res = await fetch(
            `https://expensetracker-16e15-default-rtdb.firebaseio.com/expenses/${username}.json`,
            {
                method: "POST",
                body: JSON.stringify(expenses)
            }
        );
        if (!res.ok) {
            console.log(res);
        }
        window.location.reload();
        return res.json();
    };
    const submitHandler = (e) => {
        e.preventDefault();
        const data = { expense, description, category };
        const res = sendData(data);
        res.catch((err) => {
            console.log(err);
        })
        dispatch(cartActions.addExpense({
            expense,
            description,
            category
        }));
    }

    const editDeleteHandler = (id, isEdit) => {
        if (isEdit) {
            const toEdit = (items.find((expense) => expense.key === id));
            setExpense(toEdit.expense);
            setDescription(toEdit.description);
            setCategory(toEdit.category);
        }
        fetch(`https://expensetracker-16e15-default-rtdb.firebaseio.com/expenses/${username}/${id}.json`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                })
            }
        }).catch((err) => {
            console.log(err.message);
        })
        dispatch(cartActions.removeExpense(id));
    }

    const premiumHandler = (e) => {
        e.preventDefault();
        dispatch(themeActions.activateTheme());
    }

    return (
        <Fragment>
            <div className={bgColor === true ? "dark" : ""}>
                <div className="expense_main">
                    <h1>Welcome to Expense Tracker</h1>
                    {isToken && <p>Your profile is incomplete.
                        <NavLink to="/profile" className={bgColor === false ? "profile_update" : "profile_update_dark"}>Complete now</NavLink>
                    </p>}
                </div>
                <div className="expense_form">
                    <form onSubmit={submitHandler}>
                        <div className="input">
                            <label htmlFor="expense">Expense:</label>
                            <input type="number" id="expense" placeholder="Enter expense" value={expense} onChange={(e) => setExpense(e.target.value)} required />
                        </div>
                        <div className="input">
                            <label htmlFor="desc">Description:</label>
                            <input type="text" id="desc" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div className="input input_category">
                            <label htmlFor="category">Category</label>
                            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                                required>
                                <option value="">Select an Option</option>
                                <option value="food">Food</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Medical">Medical</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <Button className="btn-primary mb">Add Expense</Button>
                    </form>
                </div>
                <div className="premium">
                    {totalExpense > 10000 && <Button className="btn-primary mb ml" onClick={premiumHandler}>Activate Premium</Button>}
                    {<DownloadCSV data={items} />}
                </div>
                {isToken && <div id="expense-list">
                    <ul className="expense-item">
                        <li className="expense-amount"><h4>Expense</h4></li>
                        <li className="expense-desc"><h4>Description</h4></li>
                        <li className="expense-category"><h4>Category</h4></li>
                        <li className="expense-edit"><h4>Edit</h4></li>
                        <li className="expense-delete"><h4>Delete</h4></li>
                    </ul>
                    {/* Data rendered from redux Store */}
                    {items.map((expense) => {
                        return (<ul key={Math.random() * 10} className="expense-item">
                            <li className="expense-amount">{expense.expense}</li>
                            <li className="expense-desc">{expense.description}</li>
                            <li className="expense-category">{expense.category}</li>
                            <Button className="expense-edit" onClick={editDeleteHandler.bind(null, expense.key, true)}>Edit</Button>
                            <Button className="expense-delete" onClick={editDeleteHandler.bind(null, expense.key, false)}>Delete</Button>
                        </ul>)
                    })}
                </div>}
            </div>
        </Fragment >
    );
}

export default Home;