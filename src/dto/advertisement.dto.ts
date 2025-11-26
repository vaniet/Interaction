export class CreateAdvertisementDTO {
  seriesId: number;      // 关联系列ID
  cover: string;         // 广告封面路径
  info: string;          // 广告文案/信息
}

export class UpdateAdvertisementDTO {
  info: string;
  seriesId: number;
  cover: string;
  isListed: boolean;
}



