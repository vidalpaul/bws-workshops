import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

import {
  AccountBalance,
  BlockInfo,
  ChainInfo,
  FeeInfo,
  TransactionInfo,
} from './types';

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

  async getAccountBalance(address: string): Promise<AccountBalance> {
    const provider = new JsonRpcProvider(process.env.NODE_URL);
    const balance = (await provider.getBalance(address)).toString();
    return {
      address,
      balance,
    };
  }

  async getAccountTransactions(address: string): Promise<TransactionInfo[]> {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const response = await fetch(url);
    const rawTxs = (await response.json()).result;
    const txs = [];
    rawTxs.forEach((tx) => {
      txs.push({
        from: tx.from,
        to: tx.to,
        value: tx.value,
        gasPrice: tx.gasPrice,
        gasLimit: tx.gas,
        nonce: tx.nonce,
        data: tx.input,
        hash: tx.hash,
        blockNumber: tx.blockNumber,
        blockHash: tx.blockHash,
        confirmations: tx.confirmations,
      });
    });
    return txs as TransactionInfo[];
  }

  async getTokenPrice(symbol: string): Promise<number> {
    // using coinmarketcap API
    const url = `${process.env.COINMARKETCAP_API_URL}/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD&CMC_PRO_API_KEY=${process.env.COINMARKETCAP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data[symbol].quote.USD.price;
  }
}
