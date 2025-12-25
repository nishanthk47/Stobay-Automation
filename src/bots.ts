import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';

export class Bots {
    page: Page;
    bots: Locator;
    botsVerified: Locator;
    upgradePlanButton: Locator;
    createNewBot: Locator;
    createForm: Locator;
    titleInput: Locator;
    userNameInput: Locator;
    createBotButton: Locator;
    errorMessage: Locator;
    deleteBotButton: Locator;
    confimationYes: Locator;
    editButton: Locator;
    updateButton: Locator;
    landingPageSection: Locator;
    templateChoice: Locator;
    novaLandingPage: Locator;
    quantumEdgeLandingPage: Locator;
    businessNameInput: Locator;
    phoneNumberInput: Locator;
    headerInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bots = page.locator('div').filter({ hasText: 'Bots' }).first();
        this.botsVerified = page.getByRole('button', { name: 'Chat with Bot' });
        this.upgradePlanButton = page.getByRole('button', { name: 'Upgrade to create more bots' });
        this.createNewBot = page.getByRole('button', { name: 'Create New Bot' });
        this.createForm = page.locator('form:visible');
        this.titleInput = page.getByRole('textbox', { name: 'Enter your title here' });
        this.userNameInput = page.getByRole('textbox', { name: 'your bot name' });
        this.createBotButton = page.getByRole('button', { name: 'Create a Bot' });
        this.errorMessage = page.locator('div.fixed.inset-0.z-\[1000\].bg-black\/30.backdrop-blur-sm.flex.items-center.justify-center.w-full');
        this.deleteBotButton = page.locator('path[d^="M7.42432"]');
        this.confimationYes = page.getByRole('button', { name: 'Delete' });
        this.editButton = page.locator('path[d="M16.3828"]');
        this.updateButton = page.getByRole('button', { name: 'Update' });
        this.landingPageSection = page.getByRole('button', { name: 'Landing Page' });
        this.templateChoice = page.getByText('default', { exact: true });
        this.novaLandingPage = page.getByText('NovaLanding', { exact: true });
        this.quantumEdgeLandingPage = page.getByText('QuantumEdge', { exact: true });
        this.businessNameInput = page.getByRole('textbox', { name: "e.g., John's Bakery" });
        this.phoneNumberInput = page.getByRole('textbox', { name: 'e.g., 123-456-7890' });
        this.headerInput = page.getByRole('textbox', { name: 'e.g., Welcome to my profile' });
    }

    async navigateToBots() {
        await this.bots.click();
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds
        await expect(this.botsVerified).toBeVisible();
        console.info('Navigated to Bots page successfully');
    }

    async botCreation(title: string, userName: string, chooseSource: string) {

        if (await this.upgradePlanButton.isVisible()) {
            console.info('Cannot create more bots with the current plan Please upgrade to create.');
            return;
        }
        await this.createBotButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 Seconds
        await expect(this.createForm).toBeVisible();
        console.info('Creation Form is visible, proceed with bot creation steps here.');

        // Fill in the bot creation form as needed
        await this.titleInput.fill(title);
        await this.userNameInput.fill(userName);
        const sourceName = this.page.getByText(chooseSource);
        if (await sourceName.isVisible()) {
            await sourceName.click();
            console.info(`Source is exists, and Selected Successfully!`);
        } else {
            console.info('Username Not found in the list, Input a valid source.');
        }
    }

    async formErrorCheck(edit: 'True' | 'False') {

        if (edit === 'True') {
            await this.updateButton.click();
            await this.page.waitForTimeout(500); // Wait for 0.5 Seconds
        } else {
            await this.createBotButton.click();
            await this.page.waitForTimeout(500); // Wait for 0.5 Seconds
        }

        if (await this.errorMessage.isVisible()) {
            const errorText = await this.errorMessage.textContent();
            console.info(`Error message displayed: ${errorText}`);
        } else {
            console.info('Bot created successfully!');
        }
    }

    async deleteBot() {
        const initialBotCount = await this.deleteBotButton.count();
        console.info(`Number of Bots available: ${initialBotCount}`);

        if (initialBotCount === 0) {
            console.info('No Bot to delete.');
        }
        else {
            await this.deleteBotButton.first().click();
            await this.page.waitForTimeout(500);  // wait for 0.5 Second    
            await this.confimationYes.click();
            await this.page.waitForTimeout(2000); // wait for 2 Seconds 
            console.info('Bot deleted successfully.');
            const updatedBotCount = await this.deleteBotButton.count();
            console.info(`Number of Bots after deletion: ${updatedBotCount}`);
        }
    }

    async editBot(editTitle: string, editUserName?: string, editSource?: string) {
        await this.editButton.first().click();
        await this.page.waitForTimeout(500);  // wait for 0.5 Second   

        // Edit field as needed
        await this.titleInput.fill(editTitle);
        await this.userNameInput.fill(editUserName || '');
        const sourceName = this.page.getByText(editSource || '');
        if (await sourceName.isVisible()) {
            await sourceName.click();
            console.info(`Source is exists, and Selected Successfully!`);
        } else {
            console.info('Username Not found in the list, Input a valid source.');
        }
    }

    async landingPage(landingPageName: 'NovaLanding' | 'QuantumEdge', businessName: string, phoneNumber: string, header: string) {
        await this.landingPageSection.click();
        await this.page.waitForTimeout(500);  // wait for 0.5 Second

        if (landingPageName === 'NovaLanding' || landingPageName === 'QuantumEdge') {
            await this.templateChoice.click();

            if (landingPageName === 'NovaLanding') {
                await this.novaLandingPage.click();
                console.info('NovaLanding page selected successfully.');
            } else {
                await this.quantumEdgeLandingPage.click();
                console.info('QuantumEdge page selected successfully.');
            }
            await this.businessNameInput.fill(businessName);
            await this.phoneNumberInput.fill(phoneNumber);
            await this.headerInput.fill(header);
        }
    }
}