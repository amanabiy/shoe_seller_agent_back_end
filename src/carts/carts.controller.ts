import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findCartItems(
    @CurrentUser() user: any, 
  ) {
    return await this.cartsService.getItemsInCart(user.id);
  }
}
