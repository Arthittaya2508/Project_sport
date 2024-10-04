// types/types.ts
export interface Product {
  pro_id: number;
  pro_name: string;
  sale_price: number;
  pro_des: string;
  pro_image: string;
  color_id?: string;
  size_id?: string;
  quantity?: number;
}
