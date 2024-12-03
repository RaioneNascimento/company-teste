import { api } from "../../services/api";
import { CreateProductDTO } from "./dto/CreateProductDTO";
import { ProductDTO } from "./dto/ProductDTO";

const endpoint = "/product"

interface PaginatedResponse {
  data: ProductDTO[];
  meta: {
    total: number,
    lastPage: number,
    currentPage: number,
    perPage: number,
    prev: number,
    next: number
  }
}

interface BaseFilter {
  search?: string,
}

export class ProductService {
  static async createProduct(body: CreateProductDTO): Promise<ProductDTO> {
    const { data } = await api.post(endpoint, body);

    return data.content;
  }

  static async getAllPaginated(baseFilter: BaseFilter): Promise<PaginatedResponse> {
    const params: { [key: string]: string | number } = {};

    if (baseFilter) {
      if (baseFilter.search) params['search'] = baseFilter.search;
    }

    const { data } = await api.get(endpoint, { params });

    return data.content;
  }

  static async getProductById(productId: string): Promise<ProductDTO> {
    const { data } = await api.get(`${endpoint}/${productId}`);

    return data.content;
  }

  static async updateProduct(productId: string, body: CreateProductDTO): Promise<ProductDTO> {
    const { data } = await api.put(`${endpoint}/${productId}`, body);

    return data.content;
  }

  static async deleteProduct(productId: string): Promise<ProductDTO> {
    const { data } = await api.delete(`${endpoint}/${productId}`);

    return data.content;
  }
}