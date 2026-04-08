import { Page } from "@playwright/test";
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
    private readonly usernameName: string;
    private readonly passwordName: string;

    constructor() {
        super();

        // Initialise locators
        this.usernameName = 'username';
        this.passwordName = 'password';
    }

    async do_login(page: Page, username: string, password: string): Promise<this> {
        this.fillTextboxByName(page, this.usernameName, username);
        this.fillTextboxByName(page, this.passwordName, password);
        return(this);
    }
}