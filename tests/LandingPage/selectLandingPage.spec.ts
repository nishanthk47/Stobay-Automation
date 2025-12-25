import { landingPageTest } from '../../src/constants';

// Use the saved storage state 
landingPageTest.use({ storageState: 'storageState.json' });

landingPageTest.beforeEach(async ({ landingPage, page }) => {
    await page.goto(process.env.DASHBOARD_URL || '');
    await landingPage.navigateToLandingPage();
});

landingPageTest.afterEach(async ({ page }) => {
    await page.close();
});

landingPageTest.describe('Landing Page Tests', async () => {

    // Step: 1 Select Default Landing Page Template
    landingPageTest('Default Landing Page', async ({ landingPage, chat }) => {
        await landingPage.selectLandingPageTemplate('Default');
        await chat.chatWithBot('Hello from Default Landing Page', 1, 'Alice', '1234567890', '123@gmail.com');
    });

    // Step: 2 Select Nova Landing Page Template
    landingPageTest('Nova Landing Page', async ({ landingPage, chat }) => {
        await landingPage.selectLandingPageTemplate('NovaLanding');
        await chat.chatWithBot('Hello from Nova Landing Page', 1, 'Bob', '0987654321', '123@gmail.com');
    });

    // Step: 3 Select Quantum Edge Landing Page Template
    landingPageTest('Quantum Edge Landing Page', async ({ landingPage, chat }) => {
        await landingPage.selectLandingPageTemplate('QuantumEdge');
        await chat.chatWithBot('Hello from Quantum Edge Landing Page', 1, 'Charlie', '1122334455', '123@gmail.com');
    });
});

landingPageTest.describe('Edit Landing Page Tests', async () => {

    // Step 1: Edit Nova Landing Page Template
    landingPageTest('Edit Nova Landing Page', async ({ landingPage }) => {
        await landingPage.editLandingPage('NovaLanding', 'My Business', '1234567890', 'Welcome to my profile');
        await landingPage.submitLandingPage();
    });

    // Step 2: Edit Quantum Edge Landing Page Template
    landingPageTest('Edit Quantum Edge Landing Page', async ({ landingPage }) => {
        await landingPage.editLandingPage('QuantumEdge', 'My Business', '0987654321', 'Welcome to my profile');
        await landingPage.submitLandingPage();
    });
});