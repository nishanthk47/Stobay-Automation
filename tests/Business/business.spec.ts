import { businessTest } from "../../src/constants";

// Use the saved storage state 
businessTest.use({ storageState: 'storageState.json' });

businessTest.beforeEach(async ({ business, page }) => {
    await page.goto(process.env.DASHBOARD_URL || '');
    await business.navigateToBusiness();
});

businessTest.afterEach(async ({ page }) => {
    await page.close();
});

businessTest('Setup Business Information', async ({ business }) => {
    // Setup Business Information
    await business.setupBusiness('John\'s Bakery', '123-456-7890', 'Welcome to my profile', 'whatsapp.com/in/johnsbakery', 'google.com/in/johnsbakery');
    await business.businessTypes('shops');
    await business.addService('Bread Delivery', 'Delivering fresh bread daily', 3);
    await business.sumbmitBusinessInfo();
});

businessTest('Delete existing Business', async ({ business }) => {
    await business.deleteBusinessInfo();
});