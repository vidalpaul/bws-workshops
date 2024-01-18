import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { BlockInfo, ChainInfo, FeeInfo, TransactionInfo } from './types';

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
}
