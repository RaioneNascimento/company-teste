import { CategoryEnum } from "../../../enums/category";

export interface ProductDTO {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: CategoryEnum | string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
