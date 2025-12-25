import { leadsTest } from "../../src/constants";

// Use the saved storage state 
leadsTest.use({ storageState: 'storageState.json' });

leadsTest.beforeAll(async ({ leads, myProfile, page }) => {
    await page.goto(process.env.DASHBOARD_URL || '');
    const currentPlan = await myProfile.planType();
    if (currentPlan !== 'free') {
        await leads.navigateToLeads();
        await leads.leadCaptureVerification('initialCount');
        return;
    }
});

leadsTest.afterAll(async ({ page }) => {
    await page.close();
});

leadsTest('Sentiment Analysis on Leads', async ({ leads }) => {
    await leads.sentimentAnalysis('Natural');
});