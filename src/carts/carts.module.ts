import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from 'src/shoe/entities/shoe.entity';
import { Cart, CartItem } from './entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shoe, Cart, CartItem])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
