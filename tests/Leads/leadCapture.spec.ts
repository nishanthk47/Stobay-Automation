import { leadsTest } from '../../src/constants';

leadsTest.beforeEach(async ({ leads, myProfile, page }) => {
    await page.goto('https://app.staging.stobay.ai/dashboard/');
    const currentPlan = await myProfile.planType();
    if (currentPlan !== 'free') {
        await leads.navigateToLeads();
        await leads.leadCaptureVerification('initialCount');
        return;
    }
});

leadsTest.afterEach(async ({ page }) => {
    await page.close();
});

leadsTest('Lead Capture with Sequential and Keyword', async ({ leads, bots }) => {
    await bots.navigateToBots();

    // Sequential Capture
    await leads.leadCapture('Sequential', 4);
    await leads.leadCaptureVerification('CurrentCount');

    // Keyword Capture
    await leads.leadCapture('Keyword', undefined, 'Welcome');
    await leads.leadCaptureVerification('CurrentCount');

});