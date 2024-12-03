import { CategoryEnum } from "../../../enums/category";

export interface CreateProductDTO {
  name: string;
  price: number;
  description: string;
  category: CategoryEnum;
}
