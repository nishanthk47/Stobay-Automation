import { botsTest } from '../../src/constants';

botsTest.beforeAll(async ({ bots, page }) => {
    await page.goto('https://app.staging.stobay.ai/dashboard/');
    await bots.navigateToBots();
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