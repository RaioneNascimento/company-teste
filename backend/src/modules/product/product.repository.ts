import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductDTO } from './dtos/ProductDTO';
import { Product } from '@prisma/client';
import { BaseRepository } from '../Base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(prismaService: PrismaService) {
    super('product', prismaService);
  }

  async createProduct(data: ProductDTO) {
    return await this.prismaService.product.create({ data });
  }
}