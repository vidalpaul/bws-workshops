import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

@Injectable()
export class AppService {
  async getChainId(): Promise<string> {
    const provider = new JsonRpcProvider(process.env.NODE_URL);
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    return chainId.toString();
  }
}
