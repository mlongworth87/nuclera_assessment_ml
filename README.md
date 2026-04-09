# nuclera_assessment_ml
My submission for the Nuclera assessment

Considerations:

- Please note that prior to this I have had 0 hand on experience with Typescript and Playwright.
- For Repository, I worked on the Main branch for simplicity.  I know that you absolutely would not do this typcially - you would probably work off of a new branch based off either 'develop' or 'stage' depending on circumstance and/or coding practices, and then merge it all back when ready.

===================================================
 Setup INSTRUCTIONS
 ==================================================

 This code was created using Visual Studio Code (https://code.visualstudio.com/download)
 Once downloaded, ensure all code was checked out of GitHub repository: https://github.com/mlongworth87/nuclera_assessment_ml    (Probably done as you're reading this :>)
 Open VS Code, open base folder.
 Install Playwright pre-requisites:
 - Ensure Script running is enabled on computer:  
 -- Open Powershell on PC as administrator
 -- Execute following command: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
 -- PC Restart may be needed
 - Install npm:  https://nodejs.org/en/download
 -- Note:  Node.js (NPM) may need adding to environment variables.
 - Install Playwright in VS: https://playwright.dev/docs/getting-started-vscode
 - When executing tests, make sure in terminal you are in tests folder (e.g. cd .\nuclera_assessment_ml\tests\)
 - Can execute all tests (npx playwright test) or individually using UI (npx playwright test --ui)

 ==================================================
 Prioritsation Logic
 ==================================================

 - Most important - make sure Logins work - if they dont it's completely useless :)
 - Security, make sure no one without access can see info - and that non - admins cannot see admin features
 - Happy path flow for create project
 - Happy path flow for synchronise

 Ongoing considerations (Not submitted)
 - Ensure search functionality works as expected
 - Ensure status filters work as expected
 - Ensure loading once over a page's worth of projects were loaded

 Found issues:
 - On Projects page, on search projects, behaviour was weird when typing 1 character.  e.g. Searching 'G'  would bring up 'Beta' and 'Gamma' - where I would only expected Gamma to display
 - On Login page, no real error is displayed in case of bad credentials.

 ==========================================
 OO & infrastructure Choices
 ==========================================

 - Created a base page class (base_page.ts) which all pages inherit off.  This ensures all pages have access to all base functionality and use it - this promotes code reuse and ease of maintenance.
 - Pages are structured so each site page has it's own corresponding page class - this is logical and should keep things organised and easy to find
 - NOTE:  Usernames and password stored in Json file in this instance.  Usually would not recommend that or at least ensuring they're encrypted for security reasons (Usually would recommend storing on something like S3 & encrypting), but for time done it this way - just know I know not to do that usually ;)

==========================================
Manual VS Auto
==========================================

- Think best to keep tests for login blank username/password to remain manual.  could not see anything in HTML to verify the message that pops up when you click the button with an empty field

