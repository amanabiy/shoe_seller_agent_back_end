import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from './entities/cart.entity';
import { Shoe } from 'src/shoe/entities/shoe.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartsService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Shoe) private shoeRepository: Repository<Shoe>,
  ) {}

  async addItemToCart(userId: number, shoeId: number, quantity: number): Promise<any> {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
  
    let cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.shoe'] // Ensure relations are loaded
    });
  
    if (!cart) {
      cart = this.cartRepository.create({ userId, items: [] });
      cart = await this.cartRepository.save(cart);
    }

    const shoe = await this.shoeRepository.findOneBy({ id: shoeId });
    if (!shoe) {
      throw new Error('Shoe not found');
    }
  
    let existingCartItem = cart.items.find(item => item.shoe.id === shoeId);
  
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;
      
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

  async orderAllItemsInCart(user: User): Promise<void> {
    const userId = user.id;
    const cartData = await this.getItemsInCart(userId);
    const cartItems = cartData.items;

    const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    const paymentLink = this.generatePaymentLink(user, totalPrice);

    const itemList = cartItems.map(item => 
      `Shoe ID: ${item.shoe.id}, Name: ${item.shoe.brand} ${item.shoe.modelName}, Quantity: ${item.quantity}, Total Price: ${item.totalPrice}`
    ).join('\n');

    const emailText = 
      `Hello,\n\n` +
      `Here are the items in your cart:\n` +
      `${itemList}\n\n` +
      `Total Price: ${totalPrice}\n\n` +
      `Here is your payment link: ${paymentLink}\n\n` +
      `Thank you!`;
    
    await this.mailerService.sendPaymentLink(user.email, paymentLink, emailText);
  }


  generatePaymentLink(user, totalPrice) {
    return `https://example.com/pay?total=${totalPrice}`;
  }
}
