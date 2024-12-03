import { Injectable } from "@nestjs/common";
import { ProductDTO } from "./dtos/ProductDTO";
import { ProductRepository } from "./product.repository";
import { BaseFilter } from "src/utils/pagination/baseFilter";

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  async createProduct(createProductDto: ProductDTO) {
    return await this.productRepository.createProduct(createProductDto);
  }

  async getAllPaginated(filter: BaseFilter) {
    const where = {
      deletedAt: null,
      ...filter.search && {
        name: {
          contains: filter.search,
          mode: 'insensitive',
        }
      }
    };

    return await this.productRepository.pagination(
      where,
      null,
      filter,
      null
    )
  }

  async getById(productId: string) {
    return await this.productRepository.findOneById(productId);
  }

  async updateById(productId: string, updateProduct: ProductDTO) {
    return await this.productRepository.update(productId, updateProduct);
  }

  async deleteById(productId: string) {
    return await this.productRepository.delete(productId);
  }
}
