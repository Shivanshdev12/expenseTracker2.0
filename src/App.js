import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Sigup";
import Layout from "./components/Layout/Layout";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Profile from "./components/screens/Profile";
import Home from "./components/screens/Home";
import About from "./components/screens/About";


function App() {
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
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
