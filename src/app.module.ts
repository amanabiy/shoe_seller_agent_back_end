import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShoeModule } from './shoe/shoe.module';
import { CartsModule } from './carts/carts.module';
import { Shoe } from './shoe/entities/shoe.entity';
import { Cart, CartItem } from './carts/entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeminiModule } from './gemini/gemini.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // UsersModule,
     ShoeModule, CartsModule, GeminiModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Shoe, Cart, CartItem, User
      ],
      synchronize: true, // Set to false in production and use migrations
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
