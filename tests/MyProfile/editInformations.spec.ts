import { myProfileTest } from '../../src/constants';
// Use the saved storage state 
myProfileTest.use({ storageState: 'storageState.json' });

myProfileTest.beforeEach(async ({ myProfile, page }) => {
    await page.goto('https://app.staging.stobay.ai/dashboard/');
    await page.waitForTimeout(2000); // Wait for 2 Seconds
    await myProfile.navigateToMyProfile();
});

myProfileTest.afterEach(async ({ page }) => {
    await page.close();
});

myProfileTest('Edit User Profile Information', async ({ myProfile }) => {
    await myProfile.personalInfoEdit('John', 'Doe', '1234567890');
    await myProfile.expectNoFormErrors();

});

myProfileTest('Edit Business Information', async ({ myProfile }) => {
    await myProfile.businessInfoEdit();
    await myProfile.business_purpose('Business');
    await myProfile.business_lineOfBusiness('Personal Brand Building');
    await myProfile.expectNoFormErrors();
});

myProfileTest('Edit Address Information', async ({ myProfile }) => {
    await myProfile.addressInfoEdit('New York');
    await myProfile.address_state('Tamil Nadu');
    await myProfile.expectNoFormErrors();
});