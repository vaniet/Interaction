import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import type { Repository } from 'typeorm';
import { Advertisement } from '../entity/advertisement.entity';
import { Series } from '../entity/series.entity';
import { User } from '../entity/user.entity';
import { CreateAdvertisementDTO } from '../dto/advertisement.dto';

@Provide()
export class AdvertisementService {
  @InjectEntityModel(Advertisement)
  advertisementModel: Repository<Advertisement>;

  @InjectEntityModel(Series)
  seriesModel: Repository<Series>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  /**
   * 创建广告（绑定系列，仅管理员）
   */
  async createAdvertisement(
    userId: number,
    data: CreateAdvertisementDTO
  ): Promise<Advertisement> {
    const [user, series] = await Promise.all([
      this.userModel.findOne({ where: { userId } }),
      this.seriesModel.findOne({ where: { id: data.seriesId } })
    ]);

    if (!user) throw new Error('未登录或会话已过期');
    if (user.role !== 'manager') throw new Error('权限不足，需要管理员权限');
    if (!series) throw new Error('系列不存在');

    const advertisement = this.advertisementModel.create({
      seriesId: data.seriesId,
      cover: data.cover,
    });

    return await this.advertisementModel.save(advertisement);
  }

  /**
   * 删除广告
   */
  async deleteAdvertisement(userId: number, id: number): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { userId } });

    if (!user) throw new Error('未登录');
    if (user.role !== 'manager') throw new Error('权限不足');

    const advertisement = await this.advertisementModel.findOne({ where: { id } });
    if (!advertisement) throw new Error('广告不存在');

    await this.advertisementModel.remove(advertisement);
    return true;
  }

}


