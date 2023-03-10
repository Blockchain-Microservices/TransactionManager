import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { AppService } from './app.service';
import { Token } from './interfaces/token.interface';
import { CreateTokenDto } from './dto/create-token-dto';

@Controller('transaction-manager')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return this.appService.createToken(createTokenDto);
  }

  @Get()
  async getAll(): Promise<Token[]> {
    return this.appService.getAllTokens();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Token> {
    const token = await this.appService.getTokenById(id);

    if (!token)
      throw new HttpException(
        `Token with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return token;
  }

  @Get('byAddress/:address')
  async getByAddress(@Param('address') address: string): Promise<Token> {
    const token = await this.appService.getTokenByAddress(address);

    if (!token)
      throw new HttpException(
        `Token with address = ${address} not found`,
        HttpStatus.NOT_FOUND,
      );

    return token;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createTokenDto: CreateTokenDto,
  ): Promise<Token> {
    const token = await this.appService.updateToken(id, createTokenDto);

    if (!token)
      throw new HttpException(
        `Token with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return token;
  }
}
