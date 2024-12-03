import { IsOptional, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseFilter {
  @ApiProperty({ description: 'Itens por página', required: false })
  @IsOptional()
  perPage?: string;

  @ApiProperty({ description: 'Número da página', required: false })
  @IsOptional()
  page?: string;

  @ApiProperty({ description: 'Texto de busca', required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ description: 'Filtro para busca avançada', required: false })
  @IsOptional()
  where?: string;

  @ApiProperty({ description: 'Ordenação dos resultados', required: false })
  @IsOptional()
  orderBy?: string;
}
