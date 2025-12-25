import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export class LandingPage {
    page: Page;
    landingPageTab: Locator;
    landingPageVerified: Locator;
    selectLandingPage: Locator;
    editButton: Locator;
    businessNameInput: Locator;
    phoneNumberInput: Locator;
    headerInput: Locator;
    submitButton: Locator;
    errorMessage: Locator;
    selectBot: Locator;
    selectBotVisible: Locator;

    constructor(page: Page) {
        this.page = page;
        this.landingPageTab = page.locator('div').filter({ hasText: 'Landing Page' }).first();
        this.landingPageVerified = page.getByText('Pick Your Landing Page', { exact: true });
        this.selectLandingPage = page.locator('path[d^="M6.30147"]');
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.businessNameInput = page.getByRole('textbox', { name: "e.g., John's Bakery" });
        this.phoneNumberInput = page.getByRole('textbox', { name: 'e.g., 123-456-7890' });
        this.headerInput = page.getByRole('textbox', { name: 'e.g., Welcome to my profile' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.errorMessage = page.locator('div.fixed.inset-0.z-\[1000\].bg-black\/30.backdrop-blur-sm.flex.items-center.justify-center.w-full');
        this.selectBot = page.getByText('Select Bot', { exact: true });
        this.selectBotVisible = page.locator('li:visible');
    }

    async navigateToLandingPage() {
        await this.landingPageTab.click();
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds
        await expect(this.landingPageVerified).toBeVisible();
        console.info('Navigated to Landing Page successfully');
    }

    async selectLandingPageTemplate(landingPage: 'Default' | 'NovaLanding' | 'QuantumEdge') {
        if (landingPage === 'NovaLanding') {
            await this.selectLandingPage.nth(1).click();
            await this.page.waitForTimeout(2000);
            console.info('Nova Landing Page template selected');
        }
        else if (landingPage === 'QuantumEdge') {
            await this.selectLandingPage.nth(2).click();
            await this.page.waitForTimeout(2000);
            console.info('Quantum Edge Landing Page template selected');
        }
        else {
            await this.selectLandingPage.first().click();
            await this.page.waitForTimeout(2000);
            console.info('Default Landing Page template selected');
        }
    }

    async editLandingPage(LandingPageName: 'NovaLanding' | 'QuantumEdge', businessName: string, phoneNumber: string, header: string) {

        if (LandingPageName === 'NovaLanding') {
            await this.editButton.first().click();
            await this.page.waitForTimeout(1000);
            console.info('Editing Nova Landing Page template');
        }
        else {
            await this.editButton.nth(1).click();
            await this.page.waitForTimeout(1000);
            console.info('Editing Quantum Edge Landing Page template');
        }

        // Click on Select Bot
        await this.selectBot.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 a second
        if (await this.selectBotVisible.nth(1).isVisible()) {
            await this.selectBotVisible.nth(1).click();
            console.info('Bot selected for Landing Page');
        } else {
            console.info('No bots available to select for Landing Page');
        }
        await this.businessNameInput.fill(businessName);
        await this.phoneNumberInput.fill(phoneNumber);
        await this.headerInput.fill(header);
    }

    async submitLandingPage() {
        // Submit the form
        await this.submitButton.click();
        if (await this.errorMessage.isVisible()) {
            const errorText = await this.errorMessage.textContent();
            console.info(`Error message displayed: ${errorText}`);
        } else {
            console.info('Landing Page edited successfully!');
        }
    }
}