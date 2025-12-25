import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export class Business {
    page: Page;
    upgradePlanButton: Locator;
    businessTab: Locator;
    businessVerified: Locator;
    editbutton: Locator;
    editFormVerified: Locator;
    businessName: Locator;
    businessType: Locator;
    phoneNumber: Locator;
    header: Locator;
    whatsAppURL: Locator;
    mapLink: Locator;
    addServiceButton: Locator;
    title: Locator;
    decription: Locator;
    submitButton: Locator;
    confirmationMessage: Locator;
    errorMessage: Locator;
    deleteBusiness: Locator;

    constructor(page: Page) {
        this.page = page;
        this.upgradePlanButton = page.getByRole('button', { name: 'Upgrade Plan' });
        this.businessTab = page.locator('div').filter({ hasText: 'Stobay Business' }).first();
        this.businessVerified = page.locator('div.relative.rounded-lg.p-6.md\:p-4.xl\:p-6.flex.flex-col.bg-gray-50.shadow.cursor-pointer.transition.w-full.sm\:w-\[calc\(50\%_-_12px\)\].lg\:w-\[calc\(33\.33\%_-_18px\)\]');
        this.editbutton = page.getByRole('button', { name: 'Edit' });
        this.editFormVerified = page.getByText('Share Your Social & Business Presence', { exact: true });
        this.businessName = page.getByPlaceholder("e.g., John's Bakery");
        this.businessType = page.locator('[id="field-4"]');
        this.phoneNumber = page.getByPlaceholder('e.g., 123-456-7890');
        this.header = page.getByPlaceholder('e.g., Welcome to my profile');
        this.whatsAppURL = page.getByPlaceholder('e.g., whatsapp.com/in/');
        this.mapLink = page.getByPlaceholder('e.g., google.com/in/');
        this.addServiceButton = page.getByRole('button', { name: 'Add Service' });
        this.title = page.getByPlaceholder('Enter service title (max 30 characters)');
        this.decription = page.getByPlaceholder('Describe your service (max 150 characters)');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.confirmationMessage = page.getByRole('button', { name: 'Confirm' });
        this.errorMessage = page.locator('div.fixed.inset-0.z-\[1000\].bg-black\/30.backdrop-blur-sm.flex.items-center.justify-center.w-full');
        this.deleteBusiness = page.getByRole('button', { name: 'Delete' });
    }

    async navigateToBusiness() {
        // Check plan is upgraded or not
        if (await this.upgradePlanButton.isVisible()) {
            console.info('Stobay Business is not available for Free plan users.');
            return;
        }

        await this.businessTab.click();
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds
        await expect(this.businessVerified).toBeVisible();
        console.info('Navigated to Stobay Business successfully');
    }

    async setupBusiness(name: string, phoneNumber: string, headerText: string, whatsAppURL: string, mapLink: string) {
        await this.editbutton.first().click();
        await expect(this.editFormVerified).toBeVisible();
        console.info('Edit Business form is visible');

        // Fill in the business details
        await this.businessName.fill(name);
        await this.phoneNumber.fill(phoneNumber);
        await this.header.fill(headerText);
        await this.whatsAppURL.fill(whatsAppURL);
        await this.mapLink.fill(mapLink);
    }

    async businessTypes(option: 'drivers' | 'tuitions' | 'catering' | 'restaurants' | 'real estate' | 'shops' | 'others') {
        await this.businessType.selectOption(option);
    }

    async addService(title: string, description: string, serviceCount: number) {
        for (let i = 1; i <= serviceCount; i++) {
            await this.addServiceButton.click();
            await this.page.waitForTimeout(1000); // Wait for 1 Second
            await this.title.fill(title);
            await this.decription.fill(description);
        }
    }

    async sumbmitBusinessInfo() {
        // Submit the form
        await this.submitButton.click();
        await this.page.waitForTimeout(1000); // Wait for 1 Second
        await this.confirmationMessage.click();
        if (await this.errorMessage.isVisible()) {
            const errorText = await this.errorMessage.textContent();
            console.info(`Error message displayed: ${errorText}`);
        } else {
            console.info('Landing Page edited successfully!');
        }
    }

    async deleteBusinessInfo() {
        // Delete Business Information if exists
        if (await this.deleteBusiness.isVisible()) {
            await this.deleteBusiness.scrollIntoViewIfNeeded();
            await this.deleteBusiness.click();
            await this.page.waitForTimeout(1000); // Wait for 1 Second
            console.info('Business information deleted successfully!');
        } else {
            console.info('No business information to delete.');
        }

    }
}