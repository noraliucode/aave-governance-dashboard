import React from "react";
import { useParams } from "react-router-dom";

export default function ProposalDetail() {
  const { ipfsHash } = useParams() as any;

  return <div>{ipfsHash}</div>;
}
