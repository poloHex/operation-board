/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('api/users')
@Controller('api/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  async getCurrent(@Req() req) {
    return await this.userService.findById(req.user.id);
  }

  @Put('current')
  async editCurrent(@Req() req, @Body() user: User) {
    return await this.userService.edit(req.user.id, user);
  }

  @Get(':id')
  async getById(@Param() id: string) {
    return await this.userService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param() id: string) {
    return await this.userService.delete(id);
  }

  @Post()
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Put(':id')
  async edit(@Param() id: string, @Body() user: User) {
    return await this.userService.edit(id, user);
  }

}
