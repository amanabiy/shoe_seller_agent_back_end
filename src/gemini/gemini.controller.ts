import { Controller, Get, Query, HttpException, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get('chat')
  async generateText(@Query('prompt') prompt: string): Promise<{ text: string }> {
    if (!prompt) {
      throw new HttpException('Prompt query parameter is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const text = await this.geminiService.generateText(prompt);
      return { text };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error generating text from Gemini',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  
  @Post('chat')
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @CurrentUser() user: any, // Extract user using the CurrentUser decorator
    @Body('sessionId') sessionId: string,
    @Body('message') message: string,
  ): Promise<{ response: string, data: any }> {
    const response = await this.geminiService.sendMessage(user, sessionId, message);
    return response;
  }
}
