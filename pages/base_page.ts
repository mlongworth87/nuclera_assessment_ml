import { Page, expect } from "@playwright/test";

export abstract class BasePage {
    
    constructor(public page : Page) {
        
    }

    async goto_page(url : string): Promise<this> {
        await this.page.goto(url);
        return(this);
    }

    async click_element_by_role_and_name(role : 'link' | 'button', name : string): Promise<this> {
        await this.page.getByRole(role, { name: name }).click();
        return(this);
    }

    async click_element_by_test_id(testId : string): Promise<this> {
        await this.page.getByTestId(testId).click();
        return(this);
    }

    async click_element_by_xpath(xpath : string): Promise<this> {
        this.page.locator(xpath).click();
        return(this);
    }

    async click_button_by_name( name : string): Promise<this> {
        return this.click_element_by_role_and_name('button', name);
    }
    
    async fill_element_by_role_and_name(role : 'textbox' | 'searchbox', name : string, textToEnter: string): Promise<this> {
        await this.page.getByRole(role, { name: name }).fill(textToEnter);
        return(this);
    }

    async fill_textbox_by_name(name : string, textToEnter : string): Promise<this> {
        return(this.fill_element_by_role_and_name('textbox', name, textToEnter));
    }

    async select_by_value(selectName : string, selection : string): Promise<this> {
        await this.page.getByRole('combobox', { name: selectName }).selectOption(selection);
        return(this);
    }

    async verify_element_text_by_role(role : 'textbox' | 'heading' | 'cell', name : string , expectedText : string): Promise<this> {
        if(name = ''){
            await expect(this.page.getByRole(role)).toHaveText(expectedText);
        }
        else{
            await expect(this.page.getByRole(role, {name: name})).toHaveText(expectedText);
        }
        
        return(this);
    }

    async verify_element_text_by_xpath(xpath : string, expectedTest : string): Promise<this> {
        await expect(this.page.locator(xpath)).toHaveText(expectedTest);
        return(this);
    }

    async verify_page_header_text(expectedText : string): Promise<this> {
        await this.page.waitForLoadState();
        return(this.verify_element_text_by_role('heading', '', expectedText = expectedText));
    }

    async verify_element_exists_by_role_and_name(role : 'textbox' | 'link' | 'button' | 'heading', name : string, expectExist : boolean = true): Promise<this> {
        await this.page.waitForLoadState();
        if(expectExist) {
            await expect(this.page.getByRole(role, {name: name})).toBeVisible();
        }
        else{
            await(expect(this.page.getByRole(role, {name: name}))).toHaveCount(0);
        }
        return(this);
    }
}

