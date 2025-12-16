import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';

export class LogIn {
    page: Page;
    getStarted: Locator;
    continueWithGoogle: Locator;
    profileVerified: Locator;
    settings: Locator;
    logOut: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStarted = page.getByText('Get Started').first();
        this.continueWithGoogle = page.getByRole('button', { name: 'Continue with Google' });
        this.profileVerified = page.locator('[class="lg:p-2 pl-4 ml-auto my-auto"]');
        this.settings = page.getByText('Settings');
        this.logOut = page.getByText('Log Out');
    }

    async logInWithGoogle() {
        await this.getStarted.click();
        await this.continueWithGoogle.click();
        await this.page.waitForTimeout(50000); // Wait for 50 Seconds manual Google login
    }

    async verifyLogin() {
        // Profile Button Verification
        if (await this.profileVerified.isVisible()) {
            await this.profileVerified.click();
            await expect(this.settings).toBeVisible();
            await expect(this.logOut).toBeVisible();
            console.info('Login Successful');
        } else {
            console.info('Login Failed');
        }
    }
}