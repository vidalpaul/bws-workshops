import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ChainInfo } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('chaininfo')
  getChainID(): Promise<ChainInfo> {
    return this.appService.getChainInfo();
  }
}
