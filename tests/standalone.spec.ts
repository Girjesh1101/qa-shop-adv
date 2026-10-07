
import {expect, test} from "@playwright/test";


test('standalone', async ({page})=>{
    
    const productName : string = "Sport Red Shirt";
    const cardNumber: string = "123445677899";
    const cardName : string ="test";
    const cardExpire : string = "12/34"

    await page.goto('.');
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle('QA Learning Platform for Test Automation Engineers | LearnQA.dev');
    await expect(page.getByTestId('vitrin-basligi')).toBeVisible();

    await page.getByTestId("urun-ara").fill(productName);
    await page.getByRole("button", {name: "Search"}).click();

    const txt = await page.getByTestId('urun-ad-49').innerText();
    console.log("text : ", txt);
    
    // add to cart product
    await page.locator('div.gap-1.p-3').filter({hasText: productName}).getByRole('button', {name: "Add to Cart" }).click();

    // sign in button
    await page.getByRole("button", {name: "Store sign-in", exact: true}).click();

    await page.locator('div.gap-1.p-3').filter({hasText: productName}).getByRole('button', {name: "Add to Cart" }).click();

    // click to the cart
    await page.getByTestId('sepet-butonu').click();

    await expect(page.getByRole("heading", {name: "My Cart"})).toBeVisible();
    await expect(page.locator('.min-w-0 p.font-bold')).toHaveText(productName);

    const qty : number = 1;
    // for(let i = 0 ; i < qty ; i++){
    //     await page.getByTestId('adet-artir-2').waitFor({state: 'visible'});
    //     await page.getByTestId('adet-artir-2').click();
    // }

    const price = (await page.locator('.w-24').innerText()).trim()//.split(" ")[1];
    console.log("price:", price);
    
    const totalPrice = (await page.getByTestId('toplam-genel').innerText()).trim()//.split(" ")[1];
    console.log("total price:", totalPrice);
    
    const shippingCost : number = 29.90;

    expect(Number( totalPrice)).toBe(Number(price) * qty + shippingCost);

    await page.getByTestId('odemeye-gec').click();

    await expect(page.getByRole("heading", {name: "Checkout"})).toBeVisible();

    // card details
    await page.getByTestId('kart-no').fill(cardNumber);
    await page.getByTestId('kart-ad').fill(cardName);
    await page.getByTestId('kart-tarih').fill(cardExpire);

    // await page.getByRole('button', {name: "Place order"}).click();
    // await expect(page.getByRole('heading', {name: 'Your order is placed'})).toBeVisible();
    // const orderId: string = await page.getByTestId("siparis-no").innerText();
    await page.pause();
})