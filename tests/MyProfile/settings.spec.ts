import { settingsTest } from '../../src/constants';

// Use the saved storage state 
settingsTest.use({ storageState: 'storageState.json' });

settingsTest('Delete User Account - Confirm Deletion', async ({ settings, page }) => {
    await settings.navigateToSettings();
    await settings.initiateAccountDeletion('Yes');
    await page.close();
});