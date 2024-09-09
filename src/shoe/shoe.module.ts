import { Module } from '@nestjs/common';
import { ShoeService } from './shoe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from './entities/shoe.entity';
import { Cart, CartItem } from 'src/carts/entities/cart.entity';
import { CartsService } from 'src/carts/carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shoe, Cart, CartItem])],
  controllers: [],
  providers: [ShoeService, CartsService],
})
export class ShoeModule {}
