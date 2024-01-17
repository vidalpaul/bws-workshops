export type BlockInfo = {
  blockNumber: number;
  blockHash: string;
  timestamp: number;
};

export type ChainInfo = {
  network: string;
  chainId: string;
};

export type TransactionInfo = {
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  nonce: string;
  data: string;
  hash: string;
  blockNumber: number;
  blockHash: string;
  timestamp: number;
};
