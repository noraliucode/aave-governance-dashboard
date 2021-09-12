import React from "react";
import { useParams, useHistory } from "react-router-dom";
// @ts-ignore
import { BackButton, Header } from "@aragon/ui";
import { useProposal } from "../hooks";
// @ts-ignore
import marked from "marked";

export default function ProposalDetail() {
  const { id } = useParams() as any;
  console.log("id!!", id);
  const history = useHistory();
  const proposal = useProposal(id);
  const { title, description } = proposal;
  console.log("proposal", proposal);
  console.log("description", description);

  return (
    <div>
      <BackButton onClick={() => history.push(`/`)} />
      <Header primary={title} />
      <div dangerouslySetInnerHTML={{ __html: marked(description || "") }} />
    </div>
  );
}
