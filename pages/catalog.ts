import {Locator, Page} from "@playwright/test";
export class CatalogPage {


    protected readonly searchInput : Locator;
    protected readonly searchBtn : Locator;
    protected readonly itemDetails: Locator;
    protected readonly productLabelTxt: Locator;
    protected readonly addToCartBtn: Locator;
    protected readonly availableStockLabel: Locator;
    protected readonly productPriceLabel : Locator;
    protected readonly loginBtn: Locator;
    protected readonly emailInput: Locator;
    protected readonly passwordInput: Locator;
    protected readonly signInSubmitBtn: Locator;

    constructor(private readonly page : Page){
        this.searchInput = page.getByTestId('urun-ara');
        this.searchBtn = page.getByRole("button", {name: 'Search'});
        this.itemDetails = page.locator('div.gap-1.p-3');
        this.productLabelTxt = page.getByTestId('detay-ad');
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
        this.availableStockLabel = page.locator('.mt-3 b');
        this.productPriceLabel = page.getByTestId("detay-fiyat");
        this.loginBtn = page.getByTestId('giris-ac');
        this.emailInput = page.getByTestId('giris-eposta');
        this.passwordInput = page.getByTestId('giris-parola');
        this.signInSubmitBtn = page.getByRole('button', { name: 'Store sign-in', exact: true });
    }

    async enterProduct(productName: string): Promise<void>{
        await this.searchInput.waitFor({state:"visible"});
        await this.searchInput.fill(productName);
    }

    async clickSeach(): Promise<void>{
        await this.searchBtn.click();
    }


    async searchProduct(productName: string): Promise<void>{
        await this.enterProduct(productName);
        await this.clickSeach();
    }

    async openProduct(productName: string):Promise<void>{
       await this.itemDetails
        .filter({hasText: productName})
        .getByRole("link", {name: productName})
        .click();
    }

    async productLabel():Promise<string>{
        return await this.productLabelTxt.innerText();
    }

     async productPrice():Promise<string>{
        return (await this.productPriceLabel.innerText()).trim();
    }

    // async signIn(email: string = 'demo@qashop.test', password: string = 'Password123!'): Promise<void>{
    //     await this.loginBtn.click();
    //     await this.emailInput.waitFor({ state: 'visible' });
    //     await this.emailInput.fill(email);
    //     await this.passwordInput.fill(password);
    //     await this.signInSubmitBtn.click();
    //     await this.page.getByRole('button', { name: 'Sign out', exact: true }).waitFor({ state: 'visible' });
    // }

    async size(): Promise<void>{

        const allSize: string[] = ['S', 'M', 'L'];
        const randomNumber = Math.floor(Math.random()* allSize.length);
        console.log("Size: ", allSize[randomNumber]);
        
        await this.page.getByRole("button", {name: allSize[randomNumber], exact: true}).click();
    }

    async avaibleStock():Promise<string>{
        return (await this.availableStockLabel.nth(1).innerText());
    }

    async addCart():Promise<void>{
        await this.addToCartBtn.waitFor({ state: 'visible' });
        await this.addToCartBtn.click();
    }

}