import test from "@playwright/test";

test.describe('standalone api test', async()=>{

    const BASE_URL = '';


    test.beforeEach( async ({request})=>{

        const response = await request.get(``);
    })
})