import { Locator, Page } from "@playwright/test";

export class LoginPage{

    protected readonly loginBtn: Locator;
    protected readonly emailInput: Locator;
    protected readonly passwordInput: Locator;
    protected readonly signInSubmitBtn: Locator;

    constructor(private readonly page : Page){

        this.loginBtn = page.getByTestId('giris-ac');
        this.emailInput = page.getByTestId('giris-eposta');
        this.passwordInput = page.getByTestId('giris-parola');
        this.signInSubmitBtn = page.getByRole('button', { name: 'Store sign-in', exact: true });
    }

      async enterEmail(email: string): Promise<void>{
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void>{
        await this.passwordInput.fill(password);
    }

    async clickSignIn(): Promise<void>{
        await this.signInSubmitBtn.click();
    }


    async login(email: string = 'demo@qashop.test', password: string = 'Password123!'): Promise<void>{
        await this.loginBtn.click();
        await this.enterEmail(email)
        await this.enterPassword(password);
        await this.clickSignIn();
        await this.page.getByRole('button', { name: 'Sign out', exact: true }).waitFor({ state: 'visible' });
    }
}

