
import {expect, test} from "@playwright/test";


test('standalone', async ({page})=>{
    
    const BASE_URL : string = `https://learnqa.dev/en/qa-shop/`;
    await page.goto(BASE_URL);
    await page.waitForTimeout(5000)
    // await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle('QA Learning Platform for Test Automation Engineers | LearnQA.dev');
    await expect(page.getByTestId('vitrin-basligi')).toBeVisible();

})