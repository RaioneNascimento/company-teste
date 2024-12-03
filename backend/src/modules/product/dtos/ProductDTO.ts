import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ProductDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: CategoryEnum,
    example: CategoryEnum.ELETRONICOS,
    description: 'Tipo do produto',
  })
  @IsNotEmpty()
  @IsEnum(CategoryEnum)
  category: CategoryEnum;
}
