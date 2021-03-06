import React from "react";
import { useParams, useHistory } from "react-router-dom";
// @ts-ignore
import { BackButton, Header, Bar, Main, SyncIndicator } from "@aragon/ui";
import { useProposal } from "../hooks";
// @ts-ignore
import marked from "marked";

export default function ProposalDetail() {
  const { id } = useParams() as any;
  const history = useHistory();
  const proposal = useProposal(id);
  const { title, description, body } = proposal;

  if (!title) {
    return <SyncIndicator style={{ width: 200 }} />;
  }

  return (
    <div>
      <Bar
        primary={<BackButton label="Aave" onClick={() => history.push(`/`)} />}
      />

      <Header primary={title} />
      <div
        dangerouslySetInnerHTML={{
          __html: marked(description || body || ""),
        }}
      />
    </div>
  );
}
