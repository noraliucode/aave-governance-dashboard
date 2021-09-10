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
import { useOnChain } from "../hooks";

export default function ProposalList(props: ProposalPropType) {
  const { selected } = props;
  const history = useHistory();
  const { onChainData, offChainData } = useOnChain();

  const goToDetail = useCallback(
    (ipfsHash: string) => {
      history.push(`/proposal/${ipfsHash}`);
    },
    [history]
  );

  return (
    <DataView
      fields={["Title", "currentYesVote", "status", "ProposalState", ""]}
      entries={selected === selectedType.offChain ? offChainData : onChainData}
      renderEntry={({
        title,
        againstVotes,
        forVotes,
        proposalState,
        status,
        ipfsHash,
      }: ProposalType) => {
        return [
          <Button label={title} onClick={() => goToDetail(ipfsHash)} />,
          <div>{forVotes}</div>,
          <div>{status}</div>,
          <div>{ProposalState[proposalState]}</div>,
        ];
      }}
    />
  );
}
