import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDTO } from "./dtos/ProductDTO";
import { ApiBody, ApiQuery } from "@nestjs/swagger";

import { Response } from "express";
import { BaseFilter } from "src/utils/pagination/baseFilter";

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @Post('')
  @ApiBody({ type: ProductDTO })
  async create(@Body() createProduct: ProductDTO, @Res() response: Response): Promise<Response> {
    try {
      await this.productService.createProduct(createProduct);

      return response.status(HttpStatus.CREATED).send({
        message: 'Produtos criado com sucesso!',
      })
    } catch (error) {
      return response.status(error.status).send({
        message: error.message,
      });
    }
  }

  @Get('')
  async getAll(
    @Query() filter: BaseFilter,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const products = await this.productService.getAllPaginated(filter);

      return response.status(HttpStatus.OK).send({
        message: 'Produtos retornados com sucesso!',
        content: products
      })
    } catch (error) {
      return response.status(error.status).send({
        message: error.message,
      })
    }
  }

  @Get('/:productId')
  async getById(
    @Param('productId') productId: string,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const product = await this.productService.getById(productId);

      return response.status(HttpStatus.OK).send({
        message: 'Produtos retornado com sucesso!',
        content: product
      })
    } catch (error) {
      return response.status(error.status).send({
        message: error.message,
      })
    }
  }

  @Put('/:productId')
  @ApiBody({ type: ProductDTO })
  async updateById(
    @Param('productId') productId: string,
    @Body() updateProduct: ProductDTO,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const product = await this.productService.updateById(productId, updateProduct);

      return response.status(HttpStatus.OK).send({
        message: 'Produtos retornado com sucesso!',
        content: product
      })
    } catch (error) {
      return response.status(error.status).send({
        message: error.message,
      })
    }
  }

  @Delete('/:productId')
  async deleteById(
    @Param('productId') productId: string,
    @Res() response: Response
  ): Promise<Response> {
    try {
      await this.productService.deleteById(productId);

      return response.status(HttpStatus.OK).send({
        message: 'Produto deletado com sucesso!',
      })
    } catch (error) {
      return response.status(error.status).send({
        message: error.message,
      })
    }
  }
}
