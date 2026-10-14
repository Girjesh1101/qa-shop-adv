import { expect } from "@playwright/test";
import { Login, LoginResponse, Register, RegisterResponse } from "../models/api/types";
import { ApiClient, ApiResult } from "./api-client";

export class AuthApi {
    constructor(private readonly client: ApiClient){}

    register(payload: Register): Promise<ApiResult<RegisterResponse>>{
        return this.client.post(`/auth/register`, payload);
    }

    login(payload: Login): Promise<ApiResult<LoginResponse>>{
        return this.client.post('/auth/login', payload);
    }

    me(accessToken: string): Promise<ApiResult<unknown>>{
        return this.client.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    logut(accessToken : string): Promise<ApiResult<unknown>>{
        return this.client.post<unknown>('auth/logout', undefined, {
            Authorization: `Bearer ${accessToken}`
        });
    }

   
    getAccessToken(payload : LoginResponse): string{
        const token = payload.token;
        expect(token, "Login response should contain accessToken, access_token, or token").toEqual(expect.any(String));
        return token as string;
    }
}