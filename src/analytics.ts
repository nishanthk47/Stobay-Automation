import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export class Analytics {
    page: Page;
    analyticsTab: Locator;
    analyticsTabVerify: Locator;
    uiTotalUsers: Locator;

    constructor(page: Page) {
        this.page = page;
        this.analyticsTab = page.locator('span').filter({ hasText: 'Analytics' }).first();
        this.analyticsTabVerify = page.getByText('Total View', { exact: true });
        this.uiTotalUsers = page.locator('[class="text-black font-bold text-2xl md:text-3xl"]');
    }

    async navigateToAnalytics() {
        await this.analyticsTab.click();
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds
        await expect(this.analyticsTabVerify).toBeVisible();
        console.info('Navigated to Analytics page successfully');
    }

    async getCountOfAnonymousUsers() {
        // Fetch analytics data from the API endpoint
        const response = await this.page.request.get('https://api.stobay.ai/analytics_count');
        expect(response.status()).toBe(200);

        const data = await response.json();
        const totalUsers = data.no_anonymous_user;
        console.log(`Total Non-Anonymous Users from API: ${totalUsers}`);
        return totalUsers.toString();
    }

    async getUITotalUsersCount() {
        const uiTotalUsersText = await this.uiTotalUsers.first().textContent();
        console.log(`Total Users from UI: ${uiTotalUsersText}`);
        return uiTotalUsersText;
    }

    async initiatedAnonymousUsers() {
        await this.page.goto(process.env.CHAT_URL || '');
        await this.page.waitForTimeout(5000); // Wait for 5 Seconds
        console.info('Anonymous user initiated a chat session');
    }
}