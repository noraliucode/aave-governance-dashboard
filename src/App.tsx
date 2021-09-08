import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProposalDetail from "./components/ProposalDetail";
import ProposalList from "./components/ProposalList";

import { Main, Layout } from "@aragon/ui";

function App() {
  return (
    <Router>
      <Main>
        <Switch>
          <Route path="/proposal/:ipfsHash">
            <Layout>
              <ProposalDetail />
            </Layout>
          </Route>
          <Route path="/">
            <Layout>
              <ProposalList />
            </Layout>
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
