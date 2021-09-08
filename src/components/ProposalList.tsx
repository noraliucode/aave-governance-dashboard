import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

export default function ProposalList() {
  const history = useHistory();
  const goToDetail = useCallback(
    (ipfsHash: string) => {
      history.push(`/proposal/${ipfsHash}`);
    },
    [history]
  );

  let ipfsHash = "0x";
  return <button onClick={() => goToDetail(ipfsHash)}>ProposalList</button>;
}
