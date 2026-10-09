import { Locator, Page } from "@playwright/test";
import { Address } from "../models/checkout/address.model";
import { CardDetails, PaymentMethod } from "../models/checkout/payment.model";



export class CheckoutPage {

    protected readonly addNewAddressBtn: Locator;
    protected readonly address1Input : Locator;
    protected readonly address2Input : Locator;
    protected readonly cityInput : Locator;
    protected readonly postalCodeInput : Locator;
    protected readonly countryInput : Locator;
    protected readonly creditDebitCard : Locator;
    protected readonly bankTramsfer : Locator;
    protected readonly cashOnDelivery: Locator;
    protected readonly cardNumberInput : Locator;
    protected readonly cardNameInput: Locator;
    protected readonly cardExpireInput : Locator;
    protected readonly placeOrderBtn : Locator;
    protected readonly orderConfirmedLabel : Locator;
    protected readonly orderIdLabel: Locator;

    constructor(private readonly page : Page){
        this.addNewAddressBtn = page.getByTestId('yeni-adres-ac');
        this.address1Input = page.getByTestId('yeni-adres-label');
        this.address2Input = page.getByTestId('yeni-adres-line1');
        this.cityInput = page.getByTestId('yeni-adres-city');
        this.postalCodeInput = page.getByTestId('yeni-adres-postal_code');
        this.countryInput = page.getByTestId('yeni-adres-country');
        this.creditDebitCard = page.getByTestId('odeme-yontemi-card');
        this.bankTramsfer = page.getByTestId('odeme-yontemi-transfer');
        this.cashOnDelivery = page.getByTestId('odeme-yontemi-cod');
        this.cardNumberInput = page.getByTestId('kart-no');
        this.cardNameInput = page.getByTestId('kart-ad');
        this.cardExpireInput = page.getByTestId('kart-tarih');
        this.placeOrderBtn = page.getByRole("button", {name: "Place order"});
        this.orderConfirmedLabel = page.locator("h1.mt-3");
        this.orderIdLabel = page.getByTestId('siparis-no');
    }

    async clickAddNewAddress():Promise<void>{
        await this.addNewAddressBtn.click();
    }

    async enterAddress1(address1: string):Promise<void>{
        await this.address1Input.fill(address1);
    }

    async enterAddress2(addess1: string):Promise<void>{
        await this.address2Input.fill(addess1)
    }

    async enterCity(city: string):Promise<void>{
        await this.cityInput.fill(city);
    }

    async enterPostalCode(postalCode: string):Promise<void>{
        await this.postalCodeInput.fill(postalCode);
    }

    async enterCountry(country: string):Promise<void>{
        await this.countryInput.fill(country);
    }

    async enterCardNumber(cardNumber : string):Promise<void>{
        await this.cardNumberInput.fill(cardNumber);
    }

    async enterCardName(cardName: string): Promise<void>{
        await this.cardNameInput.fill(cardName);
    }

    async enterCardExpiry(expiry : string):Promise<void>{
        await this.cardExpireInput.fill(expiry);
    }

    
    async fillAddress(addressDetails: Address){

        await this.clickAddNewAddress();
        await this.enterAddress1(addressDetails.address1);
        await this.enterAddress2(addressDetails.addess2);
        await this.enterCity(addressDetails.city);
        await this.enterPostalCode(addressDetails.postalCode);
        await this.enterCountry(addressDetails.country);
    }

    

    async selectPaymentMethod(payment: PaymentMethod , cardDetails : CardDetails):Promise<void>{

        switch (payment) {
            case "Credit/Debit Card":
                await this.creditDebitCard.click();
                await this.enterCardNumber(cardDetails.cardNumber);
                await this.enterCardName(cardDetails.cardName);
                await this.enterCardExpiry(cardDetails.cardExpire);
                break;
        
            case "Bank Transfer":
                await this.bankTramsfer.click();
                break;

            case "Cash on Delivery":
                await this.cashOnDelivery.click();
                break; 
        }
    }

    async clickOrderPlace():Promise<void>{
        await this.placeOrderBtn.click();
    }

    async getOrderConfirmation(): Promise<string>{
        return this.orderConfirmedLabel.innerText();
    }

    async getOrderId():Promise<string>{
        return this.orderIdLabel.innerText();
    }
}
