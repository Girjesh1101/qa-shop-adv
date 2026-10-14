import { Product, ProductListResponse, ProductQuerySearch } from "../models/api/types";
import { ApiClient, ApiResult } from "./api-client";


export class ProductApi {
    constructor(private readonly client: ApiClient) {}

    list(query: ProductQuerySearch = {}): Promise<ApiResult<ProductListResponse>>{

        const params = Object.fromEntries(
            Object.entries(query).filter(([, value])=> value !== undefined),
        ) as Record<string, string | number | boolean>;

        return this.client.get<ProductListResponse>('/products', {params})
    }

    getById(id: number | string): Promise<ApiResult<Product>>{
        return this.client.get<Product>(`/products/${encodeURIComponent(String(id))}`);
    }

    getVariants(id: number | string): Promise<ApiResult<unknown>>{
        return this.client.get<unknown>(`/products/${encodeURIComponent(String(id))}/variants`);
    }

    categories():Promise<ApiResult<unknown>>{
        return this.client.get<unknown>(`/categories`);
    }

    categoryProducts(id: number | string): Promise<ApiResult<unknown>>{
        return this.client.get<unknown>(`/categories/${encodeURIComponent(String(id))}/products`);
    }

    brand():Promise<ApiResult<unknown>>{
        return this.client.get(`/brand`);
    }

    search(query: string): Promise<ApiResult<unknown>>{
        return this.client.get<unknown>(`/search`,{
            params: {q: query}
        });
    }
}