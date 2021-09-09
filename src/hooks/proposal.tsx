import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import GovernanceV2Helper_ABI from "../constants/abi/GovernanceV2Helper_ABI";
import { aaveGovernanceV2, governanceV2Helper } from "../constants/contracts";
import { ProposalType } from "../types.ts";
import { get, parseIpfsHash } from "../utils";

export const useOnChain = () => {
  const [onChainData, setOnChainData] = useState<any[]>([]);

  useEffect(() => {
    const _fetchData = async () => {
      const data = await fetchData();
      setOnChainData(data);
    };
    _fetchData();
  }, []);

  console.log("on-chain data", onChainData);

  return onChainData;
};

const fetchData = async () => {
  // Use the mainnet
  const network = "homestead";

  // Specify your own API keys
  // Each is optional, and if you omit it the default
  // API key for that service will be used.
  const provider = ethers.getDefaultProvider(network, {
    infura: "83b98a98c5ca4761ac26ad2e8210df97",
  });

  const governanceV2HelperContract = new ethers.Contract(
    governanceV2Helper,
    GovernanceV2Helper_ABI,
    provider
  );

  const data = await governanceV2HelperContract.getProposals(
    "0",
    "0xFFFFFFFF",
    aaveGovernanceV2
  );

  const array = [] as any;
  for (let item of data) {
    const cid = parseIpfsHash(item.ipfsHash);
    console.log("cid :", cid);
    let proposalString = await get(cid);

    proposalString = proposalString.substring(
      5,
      proposalString.split("").length - 3
    );
    let proposal: ProposalType = JSON.parse(proposalString);
    array.unshift({
      ...proposal,
      forVotes: item.forVotes.toString(),
      againstVotes: item.againstVotes,
      proposalState: item.proposalState,
      title: `${proposal.basename}: ${proposal.title}`,
    });
  }
  return array;
};
