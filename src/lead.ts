import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { Bots } from './bots';

export class Leads {
    page: Page;
    Lead: Locator;
    LeadVerified: Locator;
    noLeadsMessage: Locator;
    bots: Bots;
    LeadSection: Locator;
    SequentailCapture: Locator;
    KeywordCapture: Locator;
    noOfChat: Locator;
    keywordInput: Locator;
    addButton: Locator;
    leadCount: Locator;
    sentimentAll: Locator;
    sentimentNatural: Locator;
    sentimentPositive: Locator;
    sentimentNegative: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bots = new Bots(page);
        this.Lead = page.locator('div').filter({ hasText: 'Leads' }).first();
        this.LeadVerified = page.locator('div').filter({ hasText: 'Manage and track your leads.' });
        this.noLeadsMessage = page.getByText('No leads found.', { exact: true });
        this.LeadSection = page.locator('button').filter({ hasText: 'Lead' }).first();
        this.SequentailCapture = page.getByText('Sequential Capture', { exact: true });
        this.KeywordCapture = page.getByText('Keyword Capture', { exact: true });
        this.noOfChat = page.getByRole('button', { name: '+' });
        this.keywordInput = page.getByRole('textbox', { name: 'Type a keyword and press Enter' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.leadCount = page.locator('[class="px-4 pt-7 pb-4"]').nth(4);
        this.sentimentAll = page.getByText('All', { exact: true });
        this.sentimentNatural = page.getByText('Neutral', { exact: true });
        this.sentimentPositive = page.getByText('Positive', { exact: true });
        this.sentimentNegative = page.getByText('Negative', { exact: true });
    }

    async navigateToLeads() {
        await this.Lead.click();
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds
        await expect(this.LeadVerified).toBeVisible();
        console.info('Navigated to Leads page successfully');
    }
    async leadCapture(captureType: 'Sequential' | 'Keyword', chatCount?: number, keyword?: string) {
        // Filling Bot deatils
        await this.bots.botCreation('LeadBot', 'LeadBotUser', 'Sample Source');
        await this.page.waitForTimeout(2000);

        // Lead capture
        await this.LeadSection.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 Seconds

        // Capture Type Selection
        if (captureType === 'Sequential') {
            await this.SequentailCapture.click();
            console.info('Navigated to Sequential Capture section successfully');
            for (let i = 1; i <= (chatCount ?? 1); i++) {
                await this.noOfChat.click();
                await this.page.waitForTimeout(500); // Wait for 0.5 Seconds
            }
        } else {
            await this.KeywordCapture.click();
            console.info('Navigated to Keyword Capture section successfully');
            await this.keywordInput.fill(keyword ?? 'Stobay');
            await this.addButton.click();
            await this.page.waitForTimeout(500); // Wait for 0.5 Seconds
        }
        await this.bots.formErrorCheck('False');
    }

    async leadCaptureVerification(leadCount: 'initialCount' | 'CurrentCount') {
        if (await this.noLeadsMessage.isVisible()) {
            console.info('No leads found !!');
            return;
        }
        if (leadCount === 'initialCount') {
            const initialLeadCount = await this.leadCount.count();
            console.info(`Initial Leads captured: ${initialLeadCount}`);
        } else {
            const currentLeadCount = await this.leadCount.count();
            console.info(`Current Leads captured: ${currentLeadCount}`);
        }
    }
    async sentimentAnalysis(sentimentType: 'Natural' | 'Positive' | 'Negative') {
        await this.sentimentAll.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 Seconds

        // Natural Sentiment
        if (sentimentType === 'Natural') {
            await this.sentimentNatural.click();
            await this.page.waitForTimeout(500);
            if (await this.noLeadsMessage.isVisible()) {
                console.info('No leads found for Natural Sentiment !!');
            } else {
                await expect(this.leadCount).toBeVisible();
                console.info('Leads found for Natural Sentiment');
            }
        }
        else if (sentimentType === 'Positive') {
            // Positive Sentiment
            await this.sentimentPositive.click();
            await this.page.waitForTimeout(500);
            if (await this.noLeadsMessage.isVisible()) {
                console.info('No leads found for Positive Sentiment !!');
            } else {
                await expect(this.leadCount).toBeVisible();
                console.info('Leads found for Positive Sentiment');
            }
        }
        else {
            // Negative Sentiment
            await this.sentimentNegative.click();
            await this.page.waitForTimeout(500);
            if (await this.noLeadsMessage.isVisible()) {
                console.info('No leads found for Negative Sentiment !!');
            } else {
                await expect(this.leadCount).toBeVisible();
                console.info('Leads found for Negative Sentiment');
            }
        }
    }
}