import { Injectable, Logger } from '@nestjs/common';
import GeminiClient from 'gemini-api'; // Assuming default export
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ShoeService } from 'src/shoe/shoe.service';
import { CartsService } from 'src/carts/carts.service';

import { recommendShoesFunctionDeclaration } from 'src/shoe/entities/recommended.function.declaration';
import { addItemToCartFunctionDeclaration } from 'src/carts/function_description/addItemToCartFunctionDeclaration';
import { User } from 'src/users/entities/user.entity';
import { getItemsInCartFunctionDeclaration } from 'src/carts/function_description/getItemsInCartFunctionDescription';
import { empty } from 'rxjs';
import { emptyCartFunctionDeclaration } from 'src/carts/function_description/emptyCartItemsFunctionDescription';
import { orderAllItemsInCartFunctionDeclaration } from 'src/carts/function_description/orderAllItemsInCartFunctionDeclaration';

@Injectable()
export class GeminiService {
    private readonly geminiClient: GeminiClient;
    private readonly genAIClient: GoogleGenerativeAI;
    private readonly logger = new Logger(GeminiService.name);
    private readonly chatSessions = new Map<string, any>(); // Store chat sessions by sessionId
    private functions = {
        recommendShoes: async (args: any) => {
            delete args.user;
            return this.shoeService.filterShoes(args)
        },
        addItemToCart: async (args: any) => this.cartService.addItemToCart(args.user.id, args.shoeId, args.quantity),
        getItemsInCart: async (args: any) => this.cartService.getItemsInCart(args.user.id),
        emptyCart: async (args: any) => this.cartService.emptyCart(args.user.id),
        orderAllItemsInCart: async (args: any) => this.cartService.orderAllItemsInCart(args.user),
    };

    constructor(private shoeService: ShoeService, private cartService: CartsService) {
        const geminiApiKey = process.env.GEMINI_API_KEY;
        const googleApiKey = process.env.GEMINI_API_KEY;

        if (!geminiApiKey || !googleApiKey) {
            this.logger.error('API keys are missing. Please check your environment variables.');
            throw new Error('API keys are required to initialize services.');
        }

        this.geminiClient = new GeminiClient(geminiApiKey);
        this.genAIClient = new GoogleGenerativeAI(googleApiKey);
    }



    async generateText(prompt: string): Promise<string> {
        try {
            const model = this.genAIClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent(prompt);
            const text = await result.response.text();

            this.logger.debug(`Generated text: ${text}`);
            return text;
        } catch (error) {
            this.logger.error('Failed to generate text', error.stack);
            throw new Error('Text generation failed. Please try again later.');
        }
    }

    private getOrCreateChat(sessionId: string) {
        if (!this.chatSessions.has(sessionId)) {
            const model = this.genAIClient.getGenerativeModel({
                model: 'gemini-1.5-flash',
                systemInstruction: "You are a helpful and knowledgeable shoe seller agent. Assist the customer with any inquiries they have about shoes, including styles, sizes, colors, availability, giving recommendations, adding items to the cart, and removing items from the cart. Don't make assumptions for shoe if you can't find it on the database say so. userId is passed automatically by the system don't worry about it. Don't assume any Id for the shoes, make sure to search the database according to the functions given.",
                
                tools: {
                    functionDeclarations: [
                        recommendShoesFunctionDeclaration,
                        addItemToCartFunctionDeclaration,
                        getItemsInCartFunctionDeclaration,
                        emptyCartFunctionDeclaration,
                        orderAllItemsInCartFunctionDeclaration,
                    ],
                } as any,
            });
            const chat = model.startChat({
                history: [],
            });
            this.chatSessions.set(sessionId, chat);
        }
        console.log(`Session ${sessionId} - Chat session created`);
        return this.chatSessions.get(sessionId);
    }

    async sendMessage(user: User, sessionId: string, userMessage: string): Promise<string> {
        try {
            const chat = await this.getOrCreateChat(sessionId);
            const result = await chat.sendMessage(userMessage);
            
            // Get the function calls from the response
            const functionCalls = result.response.functionCalls();
            const call = functionCalls && functionCalls.length > 0 ? functionCalls[0] : null;

            if (call) {
                // If there is a function call, execute it
                call.args.user = user;
                console.log(`Calling function: ${call.name} with arguments:`, call.args, );
                const functionToCall = this.functions[call.name];
                if (functionToCall) {
                    const apiResponse = await functionToCall(call.args);
                    console.log("apiResponse", apiResponse);
                    
                    // Send the API response back to the model so it can generate
                    // a text response that can be displayed to the user.
                    const result2 = await chat.sendMessage([{
                        functionResponse: {
                            name: call.name,
                            response: apiResponse
                        }
                    }]);
        
                    // Log and return the text response from the chat
                    console.log(result2.response.text());
                    return result2.response.text();
                } else {
                    throw new Error(`Function ${call.name} is not defined.`);
                }
            } else {
                // If there is no function call, simply return the chat response
                console.log(result.response.text());
                return result.response.text();
            }
        } catch (error) {
            this.logger.error('Failed to generate chat response', error);
            throw new Error('Chat response generation failed. Please try again later.');
        }
    }
    
}
