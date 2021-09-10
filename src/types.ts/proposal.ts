export enum selectedType {
  offChain = 1,
  onChain,
}

export type ProposalPropType = {
  selected: number;
};

export type ProposalType = {
  title: string;
  againstVotes: number;
  forVotes: string;
  proposalState: number;
  basename: string;
  status: string;
  ipfsHash: string;
};

export enum ProposalState {
  Pending = 0,
  Canceled,
  Active,
  Failed,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

export {};
