import { Page } from "@playwright/test";
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
    private readonly usernameName: string;
    private readonly passwordName: string;
    private readonly loginButton: string;

    constructor(page : Page) {
        super(page);

        // Initialise locators
        this.usernameName = 'username';
        this.passwordName = 'password';
        this.loginButton = 'Sign in';
    }

    async do_login(baseUrl : string, username : string, password : string): Promise<this> {
        await this.goto_page(baseUrl);
        await this.verify_on_login_page();
        await this.fill_username_field(username);
        await this.fill_password_field(password);
        return(this.click_login_button());
    }

    async click_login_button(): Promise<this> {
        return(this.click_element_by_role_and_name('button', this.loginButton));
    }

    async fill_username_field(username : string): Promise<this> {
        return(this.fill_textbox_by_name(this.usernameName, username));
    }

    async fill_password_field(password : string): Promise<this> {
        return(this.fill_textbox_by_name(this.passwordName, password));
    }

    //Assumption is if I can see the login button, we must be on the login page.
    async verify_on_login_page(): Promise<this> {
        await this.verify_element_exists_by_role_and_name('button' , this.loginButton);
        return(this);
    }
}