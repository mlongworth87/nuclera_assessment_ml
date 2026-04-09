import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from './base_page';

export class ProjectsPage extends BasePage {
    //Locators
    private readonly headerTitle : string;
    private readonly logoutButton: string;
    private readonly userTypeLabel: string;

    constructor(page : Page) {
        super(page);
            
        //Initilise Locators & consts
        this.headerTitle = 'Projects';
        this.logoutButton = 'Logout';
        this.userTypeLabel = '//div[@class="actions"]/span';
    }

    async click_logout_button(): Promise<this> {
        return(this.click_button_by_name(this.logoutButton));
    }

    async verify_projects_page_header(): Promise<this> {
        return(this.verify_page_header_text(this.headerTitle));

    }

    async verify_username(username : string): Promise<this> {
        return(this.verify_element_text_by_xpath(this.userTypeLabel, username));
    }
}