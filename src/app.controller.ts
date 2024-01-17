import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ChainInfo } from './types';

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
  ): Promise<any> {
    return this.appService.getBlockInfo(blockNumber);
  }
}
