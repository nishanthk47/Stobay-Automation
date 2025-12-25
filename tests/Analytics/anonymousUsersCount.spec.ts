import { analyticsTest } from "../../src/constants";

// Use the saved storage state 
analyticsTest.use({ storageState: 'storageState.json' });

analyticsTest.beforeEach(async ({ analytics, page }) => {
    await page.goto(process.env.DASHBOARD_URL || '');
    await analytics.navigateToAnalytics();
});

analyticsTest.afterEach(async ({ page }) => {
    await page.close();
});

analyticsTest('Verify Total Non-Anonymous Users count from API matches with UI', async ({ analytics }) => {
    const apiTotalUsers = await analytics.getCountOfAnonymousUsers();
    const uiTotalUsersText = await analytics.getUITotalUsersCount();

    if (uiTotalUsersText === apiTotalUsers) {
        console.info('Total Non-Anonymous Users count from API matches with UI');
    }
    else {
        console.error(`Mismatch in Total Non-Anonymous Users count: API(${apiTotalUsers}) != UI(${uiTotalUsersText})`);
    }
});