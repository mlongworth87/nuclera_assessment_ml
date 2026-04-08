import { Page } from "@playwright/test";

export abstract class BasePage {
    
    async clickElementByRoleAndName(page: Page, role: 'link' | 'button', name: string): Promise<this> {
        await page.getByRole(role, { name: name }).click();
        return(this);
    }
    
    async fillElementByRoleAndName(page: Page, role: 'textbox' | 'searchbox', name: string, textToEnter: string): Promise<this> {
        await page.getByRole(role, { name: name }).fill(textToEnter);
        return(this);
    }

    async fillTextboxByName(page: Page, name:string, textToEnter: string): Promise<this> {
        return(this.fillElementByRoleAndName(page, 'textbox', name, textToEnter));
    }
}

