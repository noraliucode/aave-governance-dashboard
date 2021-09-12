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

  const getField = () =>
    selected === selectedType.offChain
      ? ["Title", "Arthur", "State", "End Date"]
      : ["Title", "Current YesVote", "ProposalState"];

  return (
    <DataView
      fields={getField()}
      entries={proposalList}
      renderEntry={({
        title,
        againstVotes,
        forVotes,
        proposalState,
        ipfsHash,
        id,
        author,
        state,
        end,
      }: ProposalType) => {
        return selected === selectedType.offChain
          ? [
              <Button label={title} onClick={() => goToDetail(ipfsHash)} />,
              <div>{author}</div>,
              <div>{state}</div>,
              <div>{end}</div>,
            ]
          : [
              <Button label={title} onClick={() => goToDetail(id)} />,
              <div>{forVotes}</div>,
              <div>{ProposalState[proposalState]}</div>,
            ];
      }}
    />
  );
}
