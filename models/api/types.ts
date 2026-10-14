export interface ApiErrorBody {
    error?: {
        code?: string;
        message?: string;
        details?: unknown
    };
    correlationId?: string;    
}

export interface Product {
    id: number;
    sku: string;
    name: string;
    description?: string;
    price: number;
    currency?: string;
    is_active: boolean;
    brand?: string;
    category: string; 
}

export interface ProductListResponse {
    page: number;
    size: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    items: Product[]
}

export interface ProductQuerySearch {

    page?: number;
    size?: number;
    sort?: string;
    order?: "asc" | "desc";
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    q?: string;
    includeInactive?: boolean;
}

export interface Register {
    name: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string
}

export interface LoginResponse {

    token: string;
    tokenType: string
    expiresIn: number;
    expiresAt: string;
    user?: {
        id?: number | string;
        email?: string;
        name?: string
    };
    [key: string]: unknown;
}

export interface RegisterResponse {
    user : {
        id: number;
        email: string;
        name: string;
        is_active: boolean;
    }
}
