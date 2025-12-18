import { settingsTest } from '../../src/constants';

// Use the saved storage state 
settingsTest.use({ storageState: 'storageState.json' });

settingsTest.beforeAll(async ({ page }) => {
    await page.goto('https://app.staging.stobay.ai/dashboard/');
    await page.waitForTimeout(2000); // Wait for 2 Seconds
});

settingsTest('Delete User Account - Confirm Deletion', async ({ settings, page }) => {
    await settings.navigateToSettings();
    await settings.initiateAccountDeletion('Yes'); // If 'No' is passed, deletion will be canceled
    await page.close();
});

settingsTest('Log Out from User Account', async ({ settings, page }) => {
    await settings.logOut();
    await page.close();
});