import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProposalDetail from "./components/ProposalDetail";
import ProposalList from "./components/ProposalList";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/proposal/:ipfsHash">
          <ProposalDetail />
        </Route>
        <Route path="/">
          <ProposalList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
