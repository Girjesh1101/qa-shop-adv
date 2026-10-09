import test, { expect } from "@playwright/test";
import { CatalogPage } from "../../pages/catalog";
import { CartPage } from "../../pages/cartPage";
import { CardDetails } from "../../models/checkout/payment.model";
import { CheckoutPage } from "../../pages/checkoutPage";
import { LoginPage } from "../../pages/loginPage";

test('e2e customer journey', {tag: '@regression' }, async({page})=>{

    const productName : string = "Sport Red Shirt";
    await page.goto('.');
    await expect(page).toHaveTitle('QA Learning Platform for Test Automation Engineers | LearnQA.dev');
    await expect(page.getByTestId('vitrin-basligi')).toBeVisible();

    const login = new LoginPage(page);
    const catalog = new CatalogPage(page);
    await login.login();
    await catalog.searchProduct(productName);
    await catalog.openProduct(productName);
    expect(await catalog.productLabel()).toBe(productName);
    const productPrice = await catalog.productPrice();
    console.log("price:",productPrice);
    
    await catalog.size();
    const available = await catalog.avaibleStock();
    console.log("available: ", available);

    await catalog.addCart();

    const cart = new CartPage(page);
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
    
    const checkout = new CheckoutPage(page);

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