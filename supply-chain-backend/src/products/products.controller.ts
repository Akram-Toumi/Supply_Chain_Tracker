import { Controller, Get, Post, Body, Req, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  list() {
    return this.productsService.listProducts();
  }

  @Post()
  @Roles('producer')
  create(@Req() req, @Body() dto: CreateProductDto) {
    return this.productsService.createProduct(req.user, dto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}
