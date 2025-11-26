import { Body, Controller, Del, Post, Get, Param, Put } from '@midwayjs/core';
import { Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AdvertisementService } from '../service/advertisement.service';
import { CreateAdvertisementDTO, UpdateAdvertisementDTO } from '../dto/advertisement.dto';
import { ResponseResult } from '../common/response.common';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@Controller('/advertisement')
export class AdvertisementController {
  @Inject()
  advertisementService: AdvertisementService;

  @Inject()
  ctx: Context;

//  创建广告
  @Post('/create', { middleware: [JwtMiddleware] })
  async create(@Body() dto: CreateAdvertisementDTO) {
    try {
      const userId = this.ctx.user.userId;
      const advertisement = await this.advertisementService.createAdvertisement(userId, dto);

      return ResponseResult.success(advertisement, '广告创建成功');
    } catch (err) {
      return ResponseResult.error(err.message);
    }
  }

//  删除广告
  @Del('/delete/:id', { middleware: [JwtMiddleware] })
  async deleteAdvertisement(@Param('id') id: number) {
    try {
      const userId = this.ctx.user.userId;

      await this.advertisementService.deleteAdvertisement(userId, Number(id));

      return ResponseResult.success(null, '广告删除成功');
    } catch (err) {
      return ResponseResult.error(err.message);
    }
  }

//  获取所有广告
  @Get('/all')
  async getAll() {
    const list = await this.advertisementService.advertisementModel.find();
    return ResponseResult.success(list);
  }

  //  获取已上架广告（无需权限）
  @Get('/listed')
  async getListed() {
    const list = await this.advertisementService.getListed();
    return ResponseResult.success(list);
  }

  //  更新广告（仅管理员）
  @Put('/update/:id', { middleware: [JwtMiddleware] })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAdvertisementDTO
  ) {
    try {
      const userId = this.ctx.user.userId;
      const advertisement = await this.advertisementService.updateAdvertisement(
        userId,
        Number(id),
        dto
      );

      return ResponseResult.success(advertisement, '广告更新成功');
    } catch (err) {
      return ResponseResult.error(err.message);
    }
  }

  //  上下架广告（仅管理员）
  @Post('/:id/listed', { middleware: [JwtMiddleware] })
  async toggleListed(
    @Param('id') id: number,
    @Body() body: { isListed: boolean }
  ) {
    try {
      const userId = this.ctx.user.userId;

      const advertisement = await this.advertisementService.toggleListed(
        userId,
        Number(id),
        body.isListed
      );

      const message = body.isListed ? '广告已上架' : '广告已下架';
      return ResponseResult.success(advertisement, message);
    } catch (err) {
      return ResponseResult.error(err.message);
    }
  }
}


