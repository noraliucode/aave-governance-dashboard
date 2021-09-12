import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import GovernanceV2Helper_ABI from "../constants/abi/GovernanceV2Helper_ABI";
import { aaveGovernanceV2, governanceV2Helper } from "../constants/contracts";
import { ProposalType, selectedType } from "../types.ts";
import { get, parseIpfsHash } from "../utils";
import { gql, request } from "graphql-request";

// Use the mainnet
const network = "homestead";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = ethers.getDefaultProvider(network, {
  // Old API Key that has been pushed before.
  infura: "83b98a98c5ca4761ac26ad2e8210df97",
});

const governanceV2HelperContract = new ethers.Contract(
  governanceV2Helper,
  GovernanceV2Helper_ABI,
  provider
);

export const useProposalList = (selected: number) => {
  const [onChainData, setOnChainData] = useState<ProposalType[]>([]);
  const [offChainData, setOffChainData] = useState<ProposalType[]>([]);

  useEffect(() => {
    const _fetchData = async () => {
      const offChain = await fetchOffChainData();
      const onChain = await fetchOnChainData();
      setOnChainData(onChain);
      setOffChainData(offChain.proposals);
    };
    _fetchData();
  }, []);

  return selected === selectedType.offChain ? offChainData : onChainData;
};

export const useProposal = (id: string) => {
  const [data, setData] = useState<ProposalType>({} as any);
  useEffect(() => {
    const _fetchData = async () => {
      let proposal;
      if (Number.isNaN(Number(id))) {
        proposal = await fetchOffChainProposal(id);
      } else {
        proposal = await fetchOnChainProposal(id);
      }
      setData(proposal);
    };
    _fetchData();
  }, []);

  return data;
};

const fetchOnChainData = async () => {
  const data = await governanceV2HelperContract.getProposals(
    "0",
    "0xFFFFFFFF",
    aaveGovernanceV2
  );

  const array = [] as any;
  for (let i = 0; i < data.length; i++) {
    const cid = parseIpfsHash(data[i].ipfsHash);
    let proposalString = await get(cid);
    let proposal: ProposalType = JSON.parse(proposalString);
    array.unshift({
      ...proposal,
      forVotes: data[i].forVotes.toString(),
      againstVotes: data[i].againstVotes,
      proposalState: data[i].proposalState,
      title: proposal.basename
        ? `${proposal.basename}: ${proposal.title}`
        : proposal.title,
      ipfsHash: data[i].ipfsHash,
      id: i,
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

const fetchOnChainProposal = async (id: string | number) => {
  const data = await governanceV2HelperContract.getProposal(
    id,
    aaveGovernanceV2
  );

  const cid = parseIpfsHash(data.ipfsHash);
  let proposalString = await get(cid);
  let proposal: ProposalType = JSON.parse(proposalString);
  return { ...proposal, ...data };
};

export const fetchOffChainProposal = async (id: string) => {
  const q = gql`
    query ($id: String!) {
      proposal(id: $id) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        created
        plugins
        network
        strategies {
          name
          params
        }
        space {
          id
          name
        }
      }
    }
  `;
  const offChainData = await request("https://hub.snapshot.org/graphql", q, {
    id,
  });
  return offChainData.proposal;
};
