import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

import { BlockInfo, ChainInfo, TransactionInfo } from './types';

@Injectable()
export class AppService {
  async getChainInfo(): Promise<ChainInfo> {
    const provider = new JsonRpcProvider(process.env.NODE_URL);
    const network = await provider.getNetwork();
    return {
      network: network.name,
      chainId: network.chainId.toString(),
    };
  }

  async getBlockInfo(blockNumber?: number): Promise<BlockInfo> {}

  async getTransactionInfo(transactionHash: string): Promise<TransactionInfo> {}
}
