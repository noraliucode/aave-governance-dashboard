import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import GovernanceV2Helper_ABI from "../constants/abi/GovernanceV2Helper_ABI";
import { aaveGovernanceV2, governanceV2Helper } from "../constants/contracts";
import { ProposalType } from "../types.ts";
import { get, parseIpfsHash } from "../utils";
import { gql, request } from "graphql-request";

export const useOnChain = () => {
  const [onChainData, setOnChainData] = useState<any[]>([]);
  const [offChainData, setOffChainData] = useState<any[]>([]);

  useEffect(() => {
    const _fetchData = async () => {
      const offChain = await fetchOffChainData();
      const onChain = await fetchOnChainData();
      setOnChainData(onChain);
      setOffChainData(offChain.proposals);
    };
    _fetchData();
  }, []);

  console.log("on-chain data", onChainData);

  return { onChainData, offChainData };
};

const fetchOnChainData = async () => {
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
    let proposal: ProposalType = JSON.parse(proposalString);
    array.unshift({
      ...proposal,
      forVotes: item.forVotes.toString(),
      againstVotes: item.againstVotes,
      proposalState: item.proposalState,
      title: `${proposal.basename}: ${proposal.title}`,
      ipfsHash: item.ipfsHash,
    });
  }
  return array;
};

export const fetchOffChainData = async () => {
  const q = gql`
    query Proposals {
      proposals(
        first: 100
        skip: 0
        where: { space_in: ["aave.eth"] }
        orderBy: "created"
        orderDirection: desc
      ) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        space {
          id
          name
        }
      }
    }
  `;
  const offChainData = await request("https://hub.snapshot.org/graphql", q);
  return offChainData;
};
