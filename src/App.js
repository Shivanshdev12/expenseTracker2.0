import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Sigup";
import Layout from "./components/Layout/Layout";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Layout>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
