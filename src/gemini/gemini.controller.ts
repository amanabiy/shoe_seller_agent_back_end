import { Controller, Get, Query, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

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
  async sendMessage(
    @Body('sessionId') sessionId: string,
    @Body('message') message: string,
  ): Promise<{ response: string }> {
    const response = await this.geminiService.sendMessage(sessionId, message);
    return { response };
  }
}
