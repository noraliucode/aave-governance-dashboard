import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
// @ts-ignore
import { DataView, IdentityBadge } from "@aragon/ui";
import {
  ProposalPropType,
  ProposalType,
  selectedType,
  ProposalState,
} from "../types.ts";
import { useOnChain } from "../hooks";

export default function ProposalList(props: ProposalPropType) {
  const { selected } = props;
  const history = useHistory();
  const onChain = useOnChain();

  const goToDetail = useCallback(
    (ipfsHash: string) => {
      history.push(`/proposal/${ipfsHash}`);
    },
    [history]
  );

  return (
    <DataView
      fields={["Title", "currentYesVote", "status", "ProposalState"]}
      entries={
        selected === selectedType.offChain
          ? [{ title: 1, forVotes: 1 }]
          : onChain
      }
      renderEntry={({
        title,
        againstVotes,
        forVotes,
        proposalState,
        status,
      }: ProposalType) => {
        return [
          <IdentityBadge entity={title} />,
          <div>{forVotes}</div>,
          <div>{status}</div>,
          <div>{ProposalState[proposalState]}</div>,
        ];
      }}
    />
  );
}
