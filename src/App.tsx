import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProposalDetail from "./components/ProposalDetail";
import ProposalList from "./components/ProposalList";
// @ts-ignore
import { Main, Layout, Header, Tabs } from "@aragon/ui";
import { useProposalList } from "./hooks";
import NavBar from "./components/NavBar";
import { userContext } from "./contexts/userContext";
import { useConnectedUser } from "./hooks/user";

function App() {
  const [selected, setSelected] = useState(0);
  const proposalList = useProposalList(selected);
  const userInfo = useConnectedUser();

  return (
    <Router>
      <Main>
        <userContext.Provider value={userInfo}>
          <NavBar />
          <Header primary={"Aave Governance Dashboard"} />

          <Switch>
            <Route path="/proposal/:id">
              <Layout>
                <ProposalDetail />
              </Layout>
            </Route>
            <Route path="/">
              <Tabs
                items={["On-Chain", "Off-Chain"]}
                selected={selected}
                onChange={setSelected}
              />
              <Layout>
                <ProposalList proposalList={proposalList} selected={selected} />
              </Layout>
            </Route>
          </Switch>
        </userContext.Provider>
      </Main>
    </Router>
  );
}

export default App;
