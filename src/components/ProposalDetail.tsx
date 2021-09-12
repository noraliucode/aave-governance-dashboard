import React from "react";
import { useParams, useHistory } from "react-router-dom";
// @ts-ignore
import { BackButton, Header } from "@aragon/ui";
import { ProposalType } from "../types.ts";
import { useProposal } from "../hooks";

export default function ProposalDetail() {
  const { ipfsHash } = useParams() as any;
  const history = useHistory();
  const proposal = useProposal("1");
  // const { title } = proposal;
  console.log("proposal", proposal);

  return (
    <div>
      <BackButton onClick={() => history.push(`/`)} />
      {/* <Header primary={title} /> */}
      {ipfsHash}
    </div>
  );
}
