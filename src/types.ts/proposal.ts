export enum selectedType {
  offChain = 1,
  onChain,
}

export type ProposalListPropType = {
  selected: number;
  proposalList: ProposalType[];
};

export type ProposalType = {
  title: string;
  againstVotes: number;
  forVotes: string;
  proposalState: number;
  basename: string;
  status: string;
  ipfsHash: string;
  id: number;
  description: string;
  author: string;
  state: string;
  end: number;
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
