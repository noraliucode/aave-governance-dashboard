import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
// @ts-ignore
import { DataView, IdentityBadge, Button } from "@aragon/ui";
import {
  ProposalListPropType,
  ProposalType,
  selectedType,
  ProposalState,
} from "../types.ts";

export default function ProposalList(props: ProposalListPropType) {
  const { selected, proposalList } = props;
  const history = useHistory();

  const goToDetail = useCallback(
    (id: number | string) => {
      history.push(`/proposal/${id}`);
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
        id,
      }: ProposalType) => {
        return selected === selectedType.offChain
          ? [
              <Button label={title} onClick={() => goToDetail(ipfsHash)} />,
              <div>{forVotes}</div>,
              <div>{status}</div>,
              <div>{ProposalState[proposalState]}</div>,
            ]
          : [
              <Button label={title} onClick={() => goToDetail(id)} />,
              <div>{forVotes}</div>,
              <div>{status}</div>,
              <div>{ProposalState[proposalState]}</div>,
            ];
      }}
    />
  );
}
