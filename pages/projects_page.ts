import { expect, Page } from "@playwright/test";
import { BasePage } from './base_page';

export class ProjectsPage extends BasePage {
    //Locators
    private readonly titleHeader : string;
    private readonly userTypeLabel : string;
    private readonly newProjectButton : string;
    private readonly logoutButton : string;

    //New project field modal locators
    private readonly newProjectModalCreateButton : string;
    private readonly newProjectModalNameField : string;
    private readonly newProjectModalDescriptionField : string;
    private readonly newProjectModalStatusSelect : string;

    //Delete Project Confirmation modal locators
    private readonly deleteProjectConfirmModalHeader : string;
    private readonly deleteProjectConfirmModalDeleteButton : string;

    //General modal locators
    private readonly modalCancelButton : string;

    constructor(page : Page) {
        super(page);
            
        //Initilise Locators & consts
        this.titleHeader = 'Projects';
        this.userTypeLabel = '//div[@class="actions"]/span';
        this.newProjectButton = 'New Project';
        this.logoutButton = 'Logout';

        //New project modal fields
        this.newProjectModalCreateButton = 'project-modal-submit'; //Using test ID as getting by role/name gives conflict
        this.newProjectModalNameField = 'Name';
        this.newProjectModalDescriptionField = 'Description';
        this.newProjectModalStatusSelect = 'Status';

        //Delete Project Confirmation modal
        this.deleteProjectConfirmModalHeader = 'Delete Project';
        this.deleteProjectConfirmModalDeleteButton = '//div[@class="modal-confirm"]//button[.="Delete"]';

        //General modal locators
        this.modalCancelButton = 'Cancel';
    }

    //dynamic locators
    private get_project_table_row_name_field(name : string) : string {
        return('//tr[@data-testid="project-row"]//td/a[.="' + name + '"]');
    }

    private get_project_table_row_xpath_by_name(name : string, afterNameRow : boolean = true) : string {
        if(afterNameRow) {
            return(this.get_project_table_row_name_field(name) +'/parent::td/following-sibling::td');
        }
        else{
           return(this.get_project_table_row_name_field(name) +'/parent::td/preceding-sibling::td');     
        }
        
    }
    
    private get_project_table_checkbox_xpath_by_name(name : string) : string {
        return(this.get_project_table_row_xpath_by_name(name, false) + '/input'); 
    }

    private get_project_table_delete_button_xpath_by_name(name : string): string {
        return(this.get_project_table_row_xpath_by_name(name) + '//button[.="Delete"]');
    }

    async click_new_project_button(): Promise<this> {
        return(this.click_button_by_name(this.newProjectButton));
    }

    async click_logout_button(): Promise<this> {
        return(this.click_button_by_name(this.logoutButton));
    }

    async click_project_table_checkbox_by_name(name : string): Promise<this> {
        await this.click_element_by_xpath(this.get_project_table_checkbox_xpath_by_name(name));
        return(this);
    }

    async click_project_table_delete_button_by_name(name : string): Promise<this> {
        await this.click_element_by_xpath(this.get_project_table_delete_button_xpath_by_name(name));
        return(this);
    }

    async fill_new_project_modal_name_field(name : string): Promise<this> {
        return(this.fill_textbox_by_name(this.newProjectModalNameField, name));
    }

    async verify_projects_page_header(): Promise<this> {
        return(this.verify_page_header_text(this.titleHeader));

    }

    async verify_username(username : string): Promise<this> {
        return(this.verify_element_text_by_xpath(this.userTypeLabel, username));
    }

    async verify_project_exists(name : string, expectExist : boolean = true): Promise<this> {
        if (expectExist) {
            await this.page.locator(this.get_project_table_row_name_field(name)).isVisible();
        }
        else {
            await expect(this.page.locator(this.get_project_table_row_name_field(name))).toHaveCount(0);
        }
        return(this);
    }

    //Create New Project modal methods

    async click_create_new_project_modal_create_button(): Promise<this> {
        return(this.click_element_by_test_id(this.newProjectModalCreateButton));
    }

    async fill_create_new_project_modal_name_field(name : string): Promise<this> {
        return(this.fill_textbox_by_name(this.newProjectModalNameField, name));
    }

    async fill_create_new_project_modal_description_field(descrpition : string): Promise<this> {
        return(this.fill_textbox_by_name(this.newProjectModalDescriptionField, descrpition));
    }

    async select_create_new_project_modal_status(status : string): Promise<this> {
        return(this.select_by_value(this.newProjectModalStatusSelect, status))
    }

    //Delete project modal methods
    async click_delete_project_modal_delete_button(): Promise<this> {
        await this.click_element_by_xpath(this.deleteProjectConfirmModalDeleteButton);
        return(this);
    }
    
    async wait_until_delete_project_modal_is_visible(): Promise<this> {
        await this.verify_element_exists_by_role_and_name('heading', this.deleteProjectConfirmModalHeader);
        return(this);
    }

    async wait_until_delete_project_modal_is_not_visible(): Promise<this> {
        await this.verify_element_exists_by_role_and_name('heading', this.deleteProjectConfirmModalHeader, false);
        return(this);
    }

    //General modal methods
    async click_modal_cancel_button(): Promise<this> {
        return(this.click_button_by_name(this.modalCancelButton));
    }

    //Helper methods
    async create_new_project(projectName : string, projectDescription : string, status : string = 'Active'): Promise<this> {
        await this.click_new_project_button();
        await this.fill_create_new_project_modal_name_field(projectName);
        await this.fill_create_new_project_modal_description_field(projectDescription);
        await this.select_create_new_project_modal_status(status);
        await this.click_create_new_project_modal_create_button();
        return(this);
    }

    async delete_project_by_name(projectName : string): Promise<this> {
        await this.click_project_table_delete_button_by_name(projectName);
        await this.wait_until_delete_project_modal_is_visible();
        await this.click_delete_project_modal_delete_button();
        await this.wait_until_delete_project_modal_is_not_visible();
        return(this);
    }
}