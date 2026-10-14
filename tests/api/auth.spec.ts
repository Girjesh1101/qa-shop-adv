import { expect } from "@playwright/test";
import { AuthApi } from "../../api/auth.api";
import { test } from "../../fixtures/api.fixture";
import { Register } from "../../models/api/types";


const demoEmail : string = "demo@qashop.test";
const demoPassword: string = "Password123!"

test.describe("Auth API", ()=>{

    test("register a new user", async ({authApi}) =>{

        const uniqueSuffix = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
        const payload : Register = {
            name: "API Automation user",
            email: `api.automation.${uniqueSuffix}@example.com`,
            password: `StrongPass!${uniqueSuffix.slice(-4)}aA`
        }

        const {response , data } = await authApi.register(payload);   
        expect(response.status()).toBe(201);
        expect(data).toBeDefined();
    })

    test('reject weak registration password', async({authApi})=>{

        const registrationData : Register ={
            name: "weak password User",
            email: `weak.password@example.com`,
            password: "123"
        } 
        const {response, data } = await authApi.register(registrationData);

        expect(response.status()).toBe(422);
        expect(data).toBeDefined();
    });

    test('Reject invalid login credentials', async ({authApi})=>{

        const {response , data} = await authApi.login({
            email: `missing.${Date.now()}@example.com`,
            password: "wrongPassword@123"
        });
        expect(response.status()).toBe(401);
        expect(data).toBeDefined();

    })

    test("login, profile, logout, and revoked-session behaviour", async({authApi})=>{

        test.skip(!demoEmail || !demoPassword, "set DEMO_EMAIL and DEMO_PASSWORD in env.QA")

        const  loginResult = await authApi.login({
            email: demoEmail as string,
            password: demoPassword as string
        });

        expect(loginResult.response.status()).toBe(200);
        const token = authApi.getAccessToken(loginResult.data);

        const profileResult = await authApi.me(token);
        expect(profileResult.response.status()).toBe(200);
        expect(profileResult.data).toBeDefined();

        const logoutResult = await authApi.logut(token);
        expect([200, 204]).toContain(logoutResult.response.status());

        const profileAfterLogout = await authApi.me(token);
        expect(profileAfterLogout.response.status()).toBe(401);
    })
})