import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../src/pages/welcomePage";
import CreateUser from "../src/pages/createUser";
import TransactionList from "../src/pages/transactionList";
import UserLogin from "../src/pages/login";
import TransactionPage from "../src/pages/transactionPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/createUser" component={CreateUser} />
        <Route exact path="/transactionList" component={TransactionList} />
        <Route exact path="/userLogin" component={UserLogin} />
        <Route exact path="/userTransaction" component={TransactionPage} />
      </Switch>
    </Router>
  );
}

export default App;
