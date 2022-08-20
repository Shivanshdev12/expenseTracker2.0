import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Sigup";
import Layout from "./components/Layout/Layout";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Profile from "./components/screens/Profile";
import Home from "./components/screens/Home";
import { useEffect } from "react";
import { themeAction } from "./store/themeSlice";
import { cartActions } from "./store/cartSlice";

let isInitial = true;

function App() {
  let username = localStorage.getItem("email");
  const dispatch = useDispatch();
  const items = useSelector(state => state.expense.items);
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
    const fetchData = async () => {
      const res = await fetch(`https://expensetracker-16e15-default-rtdb.firebaseio.com/expenses/${username}.json`);
      if (!res.ok) {
        throw new Error("wrong");
      }
      const resData = await res.json();
      return resData;
    }
    try {
      const expenseData = fetchData();
      console.log(expenseData);
      dispatch(cartActions.replaceExpense({
        items: expenseData.items || [],
        totalExpense: 0
      }));
    }
    catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    const sendData = async () => {
      const res = await fetch(`https://expensetracker-16e15-default-rtdb.firebaseio.com/expenses/${username}.json`, {
        method: "PUT",
        body: JSON.stringify(items),
      }
      );
      if (!res.ok) {
        throw new Error("wrong");
      }
      const resData = await res.json();
    }
    if (isInitial === true) {
      isInitial = false;
      return;
    }
    sendData().catch(err => { console.log(err) });
  }, [items, dispatch]);
  return (
    <Layout>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/forget-password">
          <ForgetPassword />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
