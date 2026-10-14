import { expect } from "@playwright/test";
import { test } from "../../fixtures/api.fixture";
import { ProductApi } from "../../api/products.api";

test.describe('Products API', ()=>{

    test('return a valid paginated product list', async ({productApi})=>{

        const {response , data} = await productApi.list();
        expect(response.status()).toBe(200);
        expect(data).toMatchObject({
            page: expect.any(Number),
            size: expect.any(Number),
            total: expect.any(Number),
            totalPages: expect.any(Number),
            hasNext: expect.any(Boolean),
            items: expect.any(Array)
        })

        expect(data.items.length).toBeGreaterThan(0);
        expect(data.totalPages).toBe(Math.ceil(data.total / data.size));

        for(const product of data.items){
            expect(product.id).toEqual(expect.any(Number));
            expect(product.name).toEqual(expect.any(String));
            expect(product.price).toEqual(expect.any(Number));
            expect(product.is_active).toEqual(expect.any(Boolean));
        }
    })

    test('returns not found for a nonexistent product ID', async ({productApi})=>{
        const {response , data} = await productApi.getById(99999999);
        expect(response.status()).toBe(404);
        expect(data).toBeDefined();
    })


    test('filter product by categories', async ({productApi})=>{
        const {response , data } = await productApi.list({category: "shirts"});

        expect(response.status()).toBe(200);
        expect(data.items.length).toBeGreaterThan(0);
    })

    test("reject a seach query shorter than two characters", async ({productApi})=>{

        const {response , data } = await productApi.search("s");
        expect(response.status()).toBe(400);
    })

    test('filter products by price range', async ({productApi})=>{
        const minPrice = 100;
        const maxPrice = 200;

        const res = await productApi.list({minPrice, maxPrice});
        expect(res.response.status()).toBe(200);

        for(const product of res.data.items){
            expect(product.price).toBeGreaterThanOrEqual(minPrice);
            expect(product.price).toBeLessThanOrEqual(maxPrice);
        }
    })
})