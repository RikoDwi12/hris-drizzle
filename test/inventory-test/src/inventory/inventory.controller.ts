import { Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) { }
  @Get('/')
  getAll() {
    return this.inventoryService.getAll()
  }
  @Post('/')
  addInventory() {
    return this.inventoryService.addInventory()
  }
}
