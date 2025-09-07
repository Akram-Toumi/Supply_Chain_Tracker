import { Controller, Post, Get, Body, Req, Param, UseGuards } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tracking')
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  @Post()
  @Roles('producer', 'transporter', 'entrepot', 'distributor', 'retailer')
  addEvent(@Req() req, @Body() dto: CreateTrackingDto) {
    return this.trackingService.addEvent(req.user, dto);
  }

  @Get(':productId')
  track(@Param('productId') productId: string) {
    return this.trackingService.trackProduct(productId);
  }
}
