import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';

export class Settings {
    page: Page;
    profileVerified: Locator;
    settings: Locator;
    deleteAccountButton: Locator;
    confirmationModal: Locator;
    yesDeleteButton: Locator;
    cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileVerified = page.locator('[class="lg:p-2 pl-4 ml-auto my-auto"]');
        this.settings = page.getByText('Settings');
        this.deleteAccountButton = page.locator('[class="flex flex-col gap-1"]');
        this.confirmationModal = page.getByText('Are you sure?');
        this.yesDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async navigateToSettings() {
        await this.profileVerified.click();
        await this.settings.click();
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds
        await expect(this.deleteAccountButton).toBeVisible();
        console.info('Navigated to Settings page successfully');
    }

    async initiateAccountDeletion(confirmation: 'Yes' | 'No') {
        await this.deleteAccountButton.click();
        await expect(this.confirmationModal).toBeVisible();

        if (confirmation === 'Yes') {
            await this.yesDeleteButton.click();
            await this.page.waitForTimeout(5000); // Wait for 5 Seconds
            await expect(this.page).toHaveURL('https://app.staging.stobay.ai/');
            console.info('Account deletion confirmed and completed!');
        } else {
            await this.cancelButton.click();
            console.info('Account deletion canceled!');
        }
    }
}