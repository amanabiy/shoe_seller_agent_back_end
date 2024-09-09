import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from './entities/cart.entity';
import { Shoe } from 'src/shoe/entities/shoe.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Shoe) private shoeRepository: Repository<Shoe>,
  ) {}

    // Add an item to the cart. If the item already exists in the cart, increase the quantity.
    async addItemToCart(userId: number, shoeId: number, quantity: number): Promise<any> {
    console.log("add Item to cart is called with", userId, shoeId, quantity)
    return {"text": "Item has been added to cart"}
    let cart = await this.cartRepository.findOne({ where: { userId }, relations: ['items'] });
    
    if (!cart) {
      cart = this.cartRepository.create({ userId, items: [] });
    }

    const shoe = await this.shoeRepository.findOne({id: shoeId} as any);
    if (!shoe) {
      throw new Error('Shoe not found');
    }

    const existingCartItem = cart.items.find(item => item.shoe.id === shoeId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;
    } else {
      const cartItem = this.cartItemRepository.create({
        cart,
        shoe,
        quantity,
        price: shoe.price,
        totalPrice: shoe.price * quantity,
      });
      cart.items.push(cartItem);
    }

    return this.cartRepository.save(cart);
  }

  async removeItemFromCart(userId: number, shoeId: number, quantity: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { userId }, relations: ['items'] });
    
    if (!cart) {
      throw new Error('Cart not found');
    }

    const existingCartItem = cart.items.find(item => item.shoe.id === shoeId);
    if (!existingCartItem) {
      throw new Error('Item not found in cart');
    }

    if (existingCartItem.quantity > quantity) {
      existingCartItem.quantity -= quantity;
      existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;
    } else {
      cart.items = cart.items.filter(item => item.shoe.id !== shoeId);
      await this.cartItemRepository.remove(existingCartItem);
    }

    return this.cartRepository.save(cart);
  }

  async emptyCart(userId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({ where: { userId }, relations: ['items'] });
    
    if (!cart) {
      throw new Error('Cart not found');
    }

    await this.cartItemRepository.remove(cart.items);
    cart.items = [];

    await this.cartRepository.save(cart);
  }

  async addItemsToCart(userId: number, items: { shoeId: number, quantity: number }[]): Promise<Cart> {
    let cart = await this.cartRepository.findOne({ where: { userId }, relations: ['items'] });
    
    if (!cart) {
      cart = this.cartRepository.create({ userId, items: [] });
    }

    for (const item of items) {
      const shoe = await this.shoeRepository.findOne({id: item.shoeId} as any);
      if (!shoe) {
        throw new Error(`Shoe with ID ${item.shoeId} not found`);
      }

      const existingCartItem = cart.items.find(cartItem => cartItem.shoe.id === item.shoeId);
      if (existingCartItem) {
        existingCartItem.quantity += item.quantity;
        existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;
      } else {
        const cartItem = this.cartItemRepository.create({
          cart,
          shoe,
          quantity: item.quantity,
          price: shoe.price,
          totalPrice: shoe.price * item.quantity,
        });
        cart.items.push(cartItem);
      }
    }

    return this.cartRepository.save(cart);
  }
}
