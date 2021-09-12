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
import BigNumber from "bignumber.js";

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
      ? ["Title", "Arthur", "State"]
      : ["Title", "Current YesVote", "ProposalState"];

  return (
    <DataView
      emptyState={{
        default: {
          displayLoader: true,
          title: "Loading...",
          subtitle: null,
          illustration: <img src="empty-state-illustration-blue.png" alt="" />,
          clearLabel: null,
        },
      }}
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
              <Button label={title} onClick={() => goToDetail(id)} />,
              <div>{author}</div>,
              <div>{state}</div>,
            ]
          : [
              <Button label={title} onClick={() => goToDetail(id)} />,
              <div>{new BigNumber(forVotes).shiftedBy(-18).toFixed(2)}</div>,
              <div>{ProposalState[proposalState]}</div>,
            ];
      }}
    />
  );
}
