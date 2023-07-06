import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { BeltGuard } from './belt/belt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(BeltGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
