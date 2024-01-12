import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

import { ChainInfo } from './types';

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
}
