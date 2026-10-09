import {test as base} from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { CatalogPage } from "../pages/catalog";
import { CheckoutPage } from "../pages/checkoutPage";
import { LoginPage } from "../pages/loginPage";


type Fixture = {
    login: LoginPage;
    catalog : CatalogPage;
    cart: CartPage;
    checkout: CheckoutPage;
}

export const test = base.extend<Fixture>({
    login : async ({ page }, use) =>{
        await page.goto('.');
        const loginPage = new LoginPage(page);
        await loginPage.login();
        await use(loginPage);
    },
    catalog : async ({page}, use)=>{
        await use(new CatalogPage(page));
    },
    cart : async ({page}, use)=>{
        await use(new CartPage(page));
    },
    checkout: async ({page}, use)=>{
        await use(new CheckoutPage(page));
    }
})