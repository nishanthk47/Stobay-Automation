import { botsTest } from '../../src/constants';

// Use the saved storage state 
botsTest.use({ storageState: 'storageState.json' });

botsTest.beforeEach(async ({ bots, page }) => {
    await page.goto(process.env.DASHBOARD_URL || '');
    await bots.navigateToBots();
});

botsTest.afterEach(async ({ page }) => {
    await page.close();
});

botsTest('Create a New Bot', async ({ bots }) => {
    await bots.botCreation('TestBot', 'TestBotUser', 'Sample Source'); // prvide a small case and without whitespaces
    await bots.formErrorCheck('False');
});

botsTest('Delete Existing Bot', async ({ bots }) => {
    await bots.deleteBot();
});

botsTest('Edit Existing Bot', async ({ bots }) => {
    await bots.editBot('EditedTestBot');
    await bots.formErrorCheck('True');
});

botsTest('Landing Page with bot creation', async ({ bots }) => {
    await bots.botCreation('TestBot', 'TestBotUser', 'Sample Source'); // prvide a small case and without whitespaces
    await bots.landingPage('NovaLanding', 'Test Business', '1234567890', 'Welcome to Test Business');
    await bots.formErrorCheck('False');
});