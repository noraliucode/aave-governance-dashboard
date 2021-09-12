import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProposalDetail from "./components/ProposalDetail";
import ProposalList from "./components/ProposalList";
// @ts-ignore
import { Main, Layout, Header, Tabs } from "@aragon/ui";
import { useProposalList } from "./hooks";

function App() {
  const [selected, setSelected] = useState(0);
  const [id, setId] = useState(0);
  const proposalList = useProposalList(selected);

  return (
    <Router>
      <Main>
        <Header primary={"Aave Governance Dashboard"} />

        <Tabs
          items={["On-Chain", "Off-Chain"]}
          selected={selected}
          onChange={setSelected}
        />
        <Switch>
          <Route path="/proposal/:ipfsHash">
            <Layout>
              <ProposalDetail />
            </Layout>
          </Route>
          <Route path="/">
            <Layout>
              <ProposalList proposalList={proposalList} selected={selected} />
            </Layout>
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
