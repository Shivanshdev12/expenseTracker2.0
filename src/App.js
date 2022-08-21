import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Sigup";
import Layout from "./components/Layout/Layout";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Profile from "./components/screens/Profile";
import Home from "./components/screens/Home";
import About from "./components/screens/About";


function App() {
  const isToken = localStorage.getItem("token");
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        {isToken === null && <Route path="/login">
          <Login />
        </Route>}
        {isToken === null && <Route path="/signup">
          <SignUp />
        </Route>}
        {isToken === null && <Route path="/forget-password">
          <ForgetPassword />
        </Route>}
        {isToken !== null && <Route path="/profile">
          <Profile />
        </Route>}
        {isToken !== null && <Route path="/home">
          <Home />
        </Route>}
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
