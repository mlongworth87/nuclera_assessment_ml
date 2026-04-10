import { test } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { ProjectsPage } from '../pages/projects_page'
import { generate_random_string } from '../utils/utils';
import envConfig from '../env_config.json';
import users from '../users.json';

test.describe.configure({ mode: 'parallel' });
test.describe('Project creation and deletion suite', ()  => {

    test('Create new project and delete', async ({page}) => {
        const newProjectName = 'test001_' + generate_random_string(5);
        const lpage = new LoginPage(page);
        const projectsPage = new ProjectsPage(page);
        await lpage.do_login(envConfig.stage.base_url, users.adminUser.username , users.adminUser.password);
        await projectsPage.verify_projects_page_header();
        //Create new project
        await projectsPage.create_new_project(newProjectName, newProjectName + ' descrption');
        await projectsPage.verify_project_exists(newProjectName);
        //Click delete and cancel, verify project is not deleted on cancel
        await projectsPage.click_project_table_delete_button_by_name(newProjectName);
        await projectsPage.wait_until_delete_project_modal_is_visible();
        await projectsPage.click_modal_cancel_button();
        await projectsPage.wait_until_delete_project_modal_is_not_visible();
        await projectsPage.verify_project_exists(newProjectName);
        await projectsPage.delete_project_by_name(newProjectName);
        await projectsPage.verify_project_exists(newProjectName, false);  //With false, verifying the project no longer exists after delete
        await projectsPage.click_logout_button();
    })

})