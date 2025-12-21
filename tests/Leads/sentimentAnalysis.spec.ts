import { leadsTest } from "../../src/constants";

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

leadsTest('Sentiment Analysis on Leads', async ({ leads, page }) => {
    await leads.sentimentAnalysis('Natural');
});