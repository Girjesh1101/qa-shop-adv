import { expect } from "@playwright/test";
import { test } from "../../fixtures/baseFixture";
import { CardDetails } from "../../models/checkout/payment.model";


test('e2e test', {tag: '@regression'}, async({
    page,
    login,
    catalog,
    cart,
    checkout,
})=>{

    const productName : string = "Sport Red Shirt";
        // await page.goto('.');
        await expect(page).toHaveTitle('QA Learning Platform for Test Automation Engineers | LearnQA.dev');
        await expect(page.getByTestId('vitrin-basligi')).toBeVisible();
        await catalog.searchProduct(productName);
        await catalog.openProduct(productName);
        expect(await catalog.productLabel()).toBe(productName);
        const productPrice = await catalog.productPrice();
        console.log("price:",productPrice);
        
        await catalog.size();
        const available = await catalog.avaibleStock();
        console.log("available: ", available);
    
        await catalog.addCart();
        await cart.clickCart();
        expect(await cart.isProductVisible(productName)).toBeTruthy();
        await cart.verifyProductsDetails(productName);
        await cart.clickIncreaseQuantity(productName, 4);
        await cart.verifyProductsDetails('Sport Red Shirt', 'S', 'TRY 113.99');
    
        const shippingCharge = await cart.shipingCharge();
        console.log("shipping:",shippingCharge);
        
        const totalAmount = await cart.totalAmount();
        console.log("total:",totalAmount);
        
        await cart.clickCheckout();
        
      
    
        const cardDetaiks : CardDetails = {
            cardNumber: "123456789012",
            cardExpire: "12/26",
            cardName: "test automation"
        }
        await checkout.selectPaymentMethod("Credit/Debit Card", cardDetaiks);
        await checkout.clickOrderPlace();
        const orderConfirmation = await checkout.getOrderConfirmation();
        expect(orderConfirmation).toBe('Your order is placed');
    
        const orderId = await checkout.getOrderId();
        console.log("orderId : ",orderId);
        
    
        await page.pause();
})