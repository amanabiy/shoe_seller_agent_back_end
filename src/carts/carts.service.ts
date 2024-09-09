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

  async addItemToCart(userId: number, shoeId: number, quantity: number): Promise<any> {
    console.log("addItemToCart is called with", userId, shoeId, quantity);
  
    // Check for valid quantity
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
  
    // Fetch the cart for the user or create a new one if it doesn't exist
    let cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.shoe'] // Ensure relations are loaded
    });
  
    if (!cart) {
      cart = this.cartRepository.create({ userId, items: [] });
      cart = await this.cartRepository.save(cart);
    }

  
    // Fetch the shoe
    const shoe = await this.shoeRepository.findOneBy({ id: shoeId });
    if (!shoe) {
      throw new Error('Shoe not found');
    }
  
    // Find existing cart item or create a new one
    let existingCartItem = cart.items.find(item => item.shoe.id === shoeId);
  
    if (existingCartItem) {
      // Update existing cart item
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;
      
      // Save the updated cart item
      try {
        await this.cartItemRepository.save(existingCartItem);
      } catch (error) {
        console.error('Error updating cart item:', error);
        throw new Error('Failed to update cart item');
      }
    } else {
      // Create a new cart item
      const cartItem = this.cartItemRepository.create({
        cart,
        shoe,
        quantity,
        price: shoe.price,
        totalPrice: shoe.price * quantity,
      });
  
      // Save the new cart item
      try {
        console.log("cartItem is", cartItem);
        await this.cartItemRepository.save(cartItem);
      } catch (error) {
        console.error('Error saving new cart item:', error);
        throw new Error('Failed to save cart item');
      }
  
      // Add the new item to the cart's items array
      cart.items.push(cartItem);
    }
  
    // Save the updated cart
    try {
      return await this.cartRepository.save(cart);
    } catch (error) {
      console.error('Error saving cart:', error);
      throw new Error('Failed to update cart');
    }
  }

  async getItemsInCart(userId: number): Promise<{text: string, items: CartItem[]}> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.shoe'],
    });

    if (!cart) {
      throw new Error('Cart not found for the user');
    }

    return {"text": "cart succesfully received", items: cart.items};
  }

  async emptyCart(userId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart) {
      throw new Error('Cart not found for the user');
    }

    try {
      await this.cartItemRepository.delete({ cart: { id: cart.id } });
    } catch (error) {
      console.error('Error clearing cart items:', error);
      throw new Error('Failed to clear cart items');
    }

    cart.items = [];
    try {
      await this.cartRepository.save(cart);
    } catch (error) {
      console.error('Error updating cart after clearing items:', error);
      throw new Error('Failed to update cart');
    }
  }

  // async addItemsToCart(userId: number, items: { shoeId: number, quantity: number }[]): Promise<Cart> {
  //   let cart = await this.cartRepository.findOne({ where: { userId }, relations: ['items'] });
    
  //   if (!cart) {
  //     cart = this.cartRepository.create({ userId, items: [] });
  //   }

  //   for (const item of items) {
  //     const shoe = await this.shoeRepository.findOne({id: item.shoeId} as any);
  //     if (!shoe) {
  //       throw new Error(`Shoe with ID ${item.shoeId} not found`);
  //     }

  //     const existingCartItem = cart.items.find(cartItem => cartItem.shoe.id === item.shoeId);
  //     if (existingCartItem) {
  //       existingCartItem.quantity += item.quantity;
  //       existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;
  //     } else {
  //       const cartItem = this.cartItemRepository.create({
  //         cart,
  //         shoe,
  //         quantity: item.quantity,
  //         price: shoe.price,
  //         totalPrice: shoe.price * item.quantity,
  //       });
  //       cart.items.push(cartItem);
  //     }
  //   }

  //   return this.cartRepository.save(cart);
  // }
}
