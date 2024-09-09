import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoeService } from './shoe.service';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';

@Controller('shoe')
export class ShoeController {
  constructor(private readonly shoeService: ShoeService) {}

  // @Post()
  // create(@Body() createShoeDto: CreateShoeDto) {
  //   return this.shoeService.create(createShoeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.shoeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.shoeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShoeDto: UpdateShoeDto) {
  //   return this.shoeService.update(+id, updateShoeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.shoeService.remove(+id);
  // }
}
