module.exports = [
  {
    inputs: [],
    name: "ONE_HUNDRED_WITH_PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      {
        internalType: "contract IAaveGovernanceV2",
        name: "governance",
        type: "address",
      },
    ],
    name: "getProposal",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalVotingSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimumQuorum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimumDiff",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionTimeWithGracePeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "proposalCreated",
            type: "uint256",
          },
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
          {
            internalType: "contract IExecutorWithTimelock",
            name: "executor",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "string[]",
            name: "signatures",
            type: "string[]",
          },
          { internalType: "bytes[]", name: "calldatas", type: "bytes[]" },
          {
            internalType: "bool[]",
            name: "withDelegatecalls",
            type: "bool[]",
          },
          {
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          { internalType: "uint256", name: "endBlock", type: "uint256" },
          {
            internalType: "uint256",
            name: "executionTime",
            type: "uint256",
          },
          { internalType: "uint256", name: "forVotes", type: "uint256" },
          {
            internalType: "uint256",
            name: "againstVotes",
            type: "uint256",
          },
          { internalType: "bool", name: "executed", type: "bool" },
          { internalType: "bool", name: "canceled", type: "bool" },
          { internalType: "address", name: "strategy", type: "address" },
          { internalType: "bytes32", name: "ipfsHash", type: "bytes32" },
          {
            internalType: "enum IAaveGovernanceV2.ProposalState",
            name: "proposalState",
            type: "uint8",
          },
        ],
        internalType: "struct IGovernanceV2Helper.ProposalStats",
        name: "proposalStats",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "skip", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" },
      {
        internalType: "contract IAaveGovernanceV2",
        name: "governance",
        type: "address",
      },
    ],
    name: "getProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalVotingSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimumQuorum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimumDiff",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionTimeWithGracePeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "proposalCreated",
            type: "uint256",
          },
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
          {
            internalType: "contract IExecutorWithTimelock",
            name: "executor",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "targets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "values",
            type: "uint256[]",
          },
          {
            internalType: "string[]",
            name: "signatures",
            type: "string[]",
          },
          { internalType: "bytes[]", name: "calldatas", type: "bytes[]" },
          {
            internalType: "bool[]",
            name: "withDelegatecalls",
            type: "bool[]",
          },
          {
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          { internalType: "uint256", name: "endBlock", type: "uint256" },
          {
            internalType: "uint256",
            name: "executionTime",
            type: "uint256",
          },
          { internalType: "uint256", name: "forVotes", type: "uint256" },
          {
            internalType: "uint256",
            name: "againstVotes",
            type: "uint256",
          },
          { internalType: "bool", name: "executed", type: "bool" },
          { internalType: "bool", name: "canceled", type: "bool" },
          { internalType: "address", name: "strategy", type: "address" },
          { internalType: "bytes32", name: "ipfsHash", type: "bytes32" },
          {
            internalType: "enum IAaveGovernanceV2.ProposalState",
            name: "proposalState",
            type: "uint8",
          },
        ],
        internalType: "struct IGovernanceV2Helper.ProposalStats[]",
        name: "proposalsStats",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address[]", name: "tokens", type: "address[]" },
    ],
    name: "getTokensPower",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "votingPower",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "delegatedAddressVotingPower",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "propositionPower",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "delegatedAddressPropositionPower",
            type: "address",
          },
        ],
        internalType: "struct IGovernanceV2Helper.Power[]",
        name: "power",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
