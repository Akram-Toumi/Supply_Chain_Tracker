import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './warehouse.entity';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  findAll(): Promise<Warehouse[]> {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Warehouse> {
    return this.warehouseService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Warehouse>): Promise<Warehouse> {
    return this.warehouseService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Warehouse>): Promise<Warehouse> {
    return this.warehouseService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.warehouseService.remove(id);
  }
}
