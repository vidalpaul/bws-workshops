import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AccountBalance,
  BlockInfo,
  ChainInfo,
  FeeInfo,
  TransactionInfo,
} from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('chaininfo')
  getChainID(): Promise<ChainInfo> {
    return this.appService.getChainInfo();
  }

  @Get('block/:blockNumber')
  getBlockInfo(
    @Param('blockNumber')
    blockNumber?: number,
  ): Promise<BlockInfo> {
    return this.appService.getBlockInfo(blockNumber);
  }

  @Get('transaction/:transactionHash')
  getTransactionInfo(
    @Param('transactionHash')
    transactionHash?: string,
  ): Promise<TransactionInfo> {
    return this.appService.getTransactionInfo(transactionHash);
  }

  @Get('fee')
  getFee(): Promise<FeeInfo> {
    return this.appService.getGasPrice();
  }

  @Get('balance/:address')
  getBalance(
    @Param('address')
    address: string,
  ): Promise<AccountBalance> {
    return this.appService.getAccountBalance(address);
  }

  @Get('transactions/:address')
  getTransactions(
    @Param('address')
    address: string,
  ): Promise<TransactionInfo[]> {
    return this.appService.getAccountTransactions(address);
  }

  @Get('price/:symbol')
  getTokenPrice(
    @Param('symbol')
    tokenAddress: string,
  ): Promise<number> {
    return this.appService.getTokenPrice(tokenAddress);
  }
}
