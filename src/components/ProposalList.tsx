import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
// @ts-ignore
import { DataView, IdentityBadge, Button } from "@aragon/ui";
import {
  ProposalPropType,
  ProposalType,
  selectedType,
  ProposalState,
} from "../types.ts";

export default function ProposalList(props: ProposalPropType) {
  const { selected, proposalList } = props;
  const history = useHistory();

  const goToDetail = useCallback(
    (ipfsHash: string) => {
      history.push(`/proposal/${ipfsHash}`);
    },
    [history]
  );

  return (
    <DataView
      fields={["Title", "currentYesVote", "status", "ProposalState", ""]}
      entries={proposalList}
      renderEntry={({
        title,
        againstVotes,
        forVotes,
        proposalState,
        status,
        ipfsHash,
      }: ProposalType) => {
        return selected === selectedType.offChain
          ? [
              <Button label={title} onClick={() => goToDetail(ipfsHash)} />,
              <div>{forVotes}</div>,
              <div>{status}</div>,
              <div>{ProposalState[proposalState]}</div>,
            ]
          : [
              <Button label={title} onClick={() => goToDetail(ipfsHash)} />,
              <div>{forVotes}</div>,
              <div>{status}</div>,
              <div>{ProposalState[proposalState]}</div>,
            ];
      }}
    />
  );
}
