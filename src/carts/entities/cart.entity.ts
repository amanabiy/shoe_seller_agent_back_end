import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsInt, IsNumber } from 'class-validator';
import { Shoe } from 'src/shoe/entities/shoe.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  userId: number;  // Assuming each cart is associated with a specific user

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items: CartItem[];
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Shoe, { eager: true })
  shoe: Shoe;

  @Column('int')
  @IsInt()
  quantity: number;

  @Column('float')
  @IsNumber()
  price: number;  // This should be set when the item is added to the cart

  @Column('float')
  @IsNumber()
  totalPrice: number;  // Calculated as quantity * price
}
