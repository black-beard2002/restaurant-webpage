export type ConfigurationType = "CATEGORY" | "TYPE" | "BRAND";
export type Configuration = {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  main_image?: string;
  configuration_type: ConfigurationType;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type ItemSchema = {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  specifications?: string;
  serial_number?: string;
  model_number?: string;
  item_date?: string;
  author?: string;
  main_image?: string | null;
  images?: string[] | null;
  price?: number;
  sale_price?: number;
  discount?: number;
  is_featured?: boolean;
  is_Near?: boolean;
  rating?: number;
  qty?: number;
  stock_status?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  custom_properties?: Record<string, number | string | string[] | number[]>;
  longitude?: number;
  location?: string;
  serialNumber: string;
  modelNumber: string;
  currency?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  item_type?: string;
  category_id?: string;
  type_id?: string;
  brand_id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  provider_id?: string;
};

export interface CartItem {
  item: ItemSchema;
  quantity: number;
  excludedIngredients: string[];
}
export interface ApiResponse<T> {
  status: string;
  error: string;
  success: boolean;
  errors: string;
  message: string;
  data?: T;
}
