import { Locator, Page } from "@playwright/test";

export class CartPage {


    protected readonly cartBtn : Locator;
    protected readonly allCarts : Locator;
    protected readonly increaseQuantity : Locator;
    protected readonly totalAmountLabel : Locator;
    protected readonly shippingChargeLabel : Locator;
    protected readonly checkoutBtn: Locator;

    constructor(private readonly page: Page){
        this.cartBtn = page.getByTestId('sepet-butonu');
        this.allCarts = page.getByTestId('sepet-satirlari');
        this.increaseQuantity = page.getByRole("button", {name: "+"});
        this.totalAmountLabel = page.getByTestId('toplam-genel');
        this.shippingChargeLabel = page.getByTestId('toplam-kargo');
        this.checkoutBtn = page.getByTestId('odemeye-gec');
    }

    async clickCart():Promise<void>{
        await this.cartBtn.click();
    }

    async isProductVisible(productName: string): Promise<boolean>{
        const productRow = this.allCarts.getByText(productName, { exact: true });
        await productRow.waitFor({ state: 'visible' });
        return await productRow.isVisible();
    }

     async verifyProductsDetails(productName: string, expectedSize?: string, expectedPrice?: string): Promise<void> {
        const productRow = this.allCarts
            .locator('[data-testid^="sepet-satir-"]')
            .filter({ hasText: productName })
            .first();

        await productRow.waitFor({ state: 'visible' });

        const rowText = (await productRow.innerText()).trim();
        const isVisible = await productRow.isVisible();

        const sizeMatch = rowText.match(/\b(S|M|L)\b/i);
        const size = sizeMatch ? sizeMatch[0] : 'Size not found';

        const priceMatch = rowText.match(/TRY\s*[\d.,]+/i);
        const price = priceMatch ? priceMatch[0] : 'Price not found';

        console.log('visible:', isVisible);
        console.log('product:', productName);
        console.log('size:', size);
        console.log('price:', price);

    }

    async clickIncreaseQuantity(productName: string, quantity: number):Promise<void>{

        for(let i = 1 ; i< quantity ; i++){
            await this.allCarts.filter({hasText: productName}).getByRole('button', {name: '+'}).click();
        }
        
    }

    async shipingCharge():Promise<string>{
        return this.shippingChargeLabel.innerText();
    }

    async totalAmount():Promise<string>{
        return this.totalAmountLabel.innerText();
    }

    async clickCheckout():Promise<void>{
        return this.checkoutBtn.click();
    }
        
    
}