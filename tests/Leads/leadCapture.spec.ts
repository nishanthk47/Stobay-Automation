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

leadsTest('Lead Capture with Sequential and Keyword', async ({ leads, bots, chat }) => {
    await bots.navigateToBots();

    // Step 1: Sequential Capture
    await leads.leadCapture('TestLeadBot', 'TestLeadUser', 'Sample Source', 'Sequential', 3);

    // Step 2: Chat to Lead Captured
    await chat.navigateToChat('TestLeadBot');
    await chat.chatWithBot('Hello welcome to stobay', 3, 'Test', '1234567890', 'testleaduser@example.com');

    // Step 3: Verify Leads Captured
    await leads.leadCaptureVerification('CurrentCount');

    // Step 1: Keyword Capture
    await leads.leadCapture('KeyLeadBot', 'KeyLeadUser', 'Sample Source', 'Keyword', undefined, 'Welcome');

    // Step 2: Chat to Lead Captured
    await chat.navigateToChat('KeyLeadBot');
    await chat.chatWithBot('Hello welcome to stobay', 2, 'Key', '0987654321', 'keyleaduser@example.com');

    // Step 3: Verify Leads Captured
    await leads.leadCaptureVerification('CurrentCount');
});