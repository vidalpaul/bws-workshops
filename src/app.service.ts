import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

import { BlockInfo, ChainInfo, FeeInfo, TransactionInfo } from './types';

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

  async getBlockInfo(blockNumber?: number): Promise<BlockInfo> {
    const provider = new JsonRpcProvider(process.env.NODE_URL);
    const block = await provider.getBlock(blockNumber);
    return {
      blockNumber: block.number,
      timestamp: block.timestamp.toString(),
      blockHash: block.hash,
      parentHash: block.parentHash,
      transactions: block.transactions,
    };
  }

  async getTransactionInfo(transactionHash: string): Promise<TransactionInfo> {
    const provider = new JsonRpcProvider(process.env.NODE_URL);
    const transaction = await provider.getTransaction(transactionHash);
    const confirmations = await (
      await provider.getTransactionReceipt(transactionHash)
    ).confirmations();
    return {
      hash: transaction.hash,
      blockHash: transaction.blockHash,
      blockNumber: transaction.blockNumber,
      from: transaction.from,
      to: transaction.to,
      value: transaction.value.toString(),
      gasPrice: transaction.gasPrice.toString(),
      nonce: transaction.nonce.toString(),
      data: transaction.data,
      gasLimit: transaction.gasLimit.toString(),
      confirmations,
    };
  }

  async getGasPrice(): Promise<FeeInfo> {
    const provider = new JsonRpcProvider(process.env.NODE_URL);
    const feeData = await provider.getFeeData();
    console.log(feeData);
    return {
      maxFeePerGas: feeData.maxFeePerGas.toString(),
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.toString(),
    };
  }
}
