import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { ProjectsPage } from '../pages/projects_page'
import envConfig from '../env_config.json';
import users from '../users.json';

test.describe.configure({ mode: 'parallel' });
test.describe('Login testing suite', ()  => {

    test('Clean login as admin and logout', async ({page}) => {
        const lpage = new LoginPage(page);
        const projectsPage = new ProjectsPage(page);
        await lpage.do_login(envConfig.stage.base_url, users.adminUser.username , users.adminUser.password);
        await projectsPage.verify_projects_page_header();
        await projectsPage.verify_username(users.adminUser.username);
        await projectsPage.click_logout_button();
        await lpage.verify_on_login_page();
    })

    test('Clean login as test user and logout', async ({page}) => {
        const lpage = new LoginPage(page);
        const projectsPage = new ProjectsPage(page);
        await lpage.do_login(envConfig.stage.base_url, users.basicUser.username , users.basicUser.password);
        await projectsPage.verify_projects_page_header();
        await projectsPage.verify_username(users.basicUser.username);
        await projectsPage.click_logout_button();
        await lpage.verify_on_login_page();
    })

    test('Attempt login with empty fields', async ({page}) => {
        const lpage = new LoginPage(page);
        await lpage.goto_page(envConfig.stage.base_url);
        await lpage.verify_on_login_page();
        await lpage.click_login_button();
        page.waitForLoadState();
        await lpage.verify_on_login_page();
    })

    test('Attempt login with empty password field', async ({page}) => {
        const lpage = new LoginPage(page);
        lpage.goto_page(envConfig.stage.base_url);
        await lpage.verify_on_login_page();
        await lpage.fill_username_field(users.adminUser.username);
        await lpage.click_login_button();
        page.waitForLoadState();
        await lpage.verify_on_login_page();
    })

    test('Attempt login incorrect user', async ({page}) => {
        const lpage = new LoginPage(page);
        await lpage.do_login(envConfig.stage.base_url, "bad user 101" , users.adminUser.password);
        page.waitForLoadState();
        await lpage.verify_on_login_page();
    })

    test('Attempt login incorrect password', async ({page}) => {
        const lpage = new LoginPage(page);
        await lpage.do_login(envConfig.stage.base_url, users.adminUser.username , "badPassword");
        page.waitForLoadState();
        await lpage.verify_on_login_page();
    })
})

