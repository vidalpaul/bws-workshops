export type BlockInfo = {
  blockNumber: number;
  blockHash: string;
  timestamp: string;
  parentHash: string;
  transactions: readonly string[];
};

export type ChainInfo = {
  network: string;
  chainId: string;
};

export type TransactionInfo = {
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasLimit: string;
  nonce: string;
  data: string;
  hash: string;
  blockNumber: number;
  blockHash: string;
  confirmations: number;
};

// FeeData for post-EIP-1559 networks
export type FeeInfo = {
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};
