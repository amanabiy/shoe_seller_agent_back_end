import { Module } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { ShoeModule } from 'src/shoe/shoe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from 'src/shoe/entities/shoe.entity';
import { ShoeService } from 'src/shoe/shoe.service';
import { CartsService } from 'src/carts/carts.service';
import { Cart, CartItem } from 'src/carts/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shoe, Cart, CartItem])],
  controllers: [GeminiController],
  providers: [GeminiService, ShoeService, CartsService],
})
export class GeminiModule {}
