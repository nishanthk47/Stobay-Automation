import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { MyProfile } from './myProfile';

export class DataSource {
    page: Page;
    myProfile: MyProfile;
    dataSource: Locator;
    dataSourceVerified: Locator;
    fileUploadButton: Locator;
    uploadInput: Locator;
    uploadStatus: Locator;
    deleteButton: Locator;
    confimationYes: Locator;
    socialLinks: Locator;
    urlInput: Locator;
    importButton: Locator;
    webUrl: Locator;
    getData: Locator;
    confirmToUse: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myProfile = new MyProfile(page);
        this.dataSource = page.getByText('Data Source', { exact: true }).first();
        this.dataSourceVerified = page.locator('[class="w-full flex overflow-x-auto textAnsNo"]');
        this.fileUploadButton = page.getByRole('button', { name: 'File Upload' });
        this.uploadInput = page.locator('[class="flex text-sm font-inter mt-3"]');
        this.uploadStatus = page.locator('[class="px-4 pt-5 pb-3"]').nth(4);
        this.deleteButton = page.locator('path[d^="M7.42432"]');
        this.confimationYes = page.getByRole('button', { name: 'Delete' });
        this.socialLinks = page.getByRole('button', { name: 'Social' });
        this.urlInput = page.getByRole('textbox', { name: 'https://www.linkedin.com/in/your-profile' });
        this.importButton = page.getByRole('button', { name: 'Import' });
        this.webUrl = page.getByRole('button', { name: 'Web URL' });
        this.getData = page.locator('span').filter({ hasText: 'Get Data' }).first();
        this.confirmToUse = page.locator('input[type="checkbox"]');
    }

    async navigateToDataSource() {
        await this.dataSource.click();
        await this.dataSourceVerified.click();
        await expect(this.page).toHaveURL('https://app.staging.stobay.ai/dashboard/?tab=data-source');
        console.info('Navigated to Data Source page successfully');
    }

    async uploadDataSourceFile() {
        await this.fileUploadButton.click();
        await this.page.waitForTimeout(500); // Wait for 0.5 Second
        await this.uploadInput.click();
        await this.page.waitForTimeout(20000); // Wait for 20 Seconds to complete the upload
        const status = await this.uploadStatus.textContent();
        console.info(`Data Source upload status: ${status}`);
    }

    async deleteDataSourceFile() {
        const InitialdataSourceCount = await this.deleteButton.count();
        console.info(`Number of Data Source files available: ${InitialdataSourceCount}`);

        if (InitialdataSourceCount === 0) {
            console.info('No Data Source file to delete.');
        } else {
            await this.deleteButton.click();
            await this.page.waitForTimeout(500); // Wait for 0.5 Second 
            await this.confimationYes.click();
            await this.page.waitForTimeout(2000);
            const UpdateddataSourceCount = await this.deleteButton.count();
            console.info(`Number of Data Source files after deletion: ${UpdateddataSourceCount}`);
        }
    }

    async importFromSocialLink() {
        await this.socialLinks.click();
        await this.urlInput.fill(process.env.LINKEDIN_URL || '');
        await this.page.waitForTimeout(500); // Wait for 0.5 Second 
        await this.importButton.click();
        await this.page.waitForTimeout(30000); // Wait for 30 Seconds to complete the import  
        const status = await this.uploadStatus.textContent();
        console.info(`LinkedIn upload status: ${status}`);
    }

    async importWebURL() {
        // Check the current plan type
        await this.myProfile.navigateToMyProfile();
        const currentPlan = await this.myProfile.planType();
        if (currentPlan === 'free') {
            console.info('Import from Social Link is not available for Free plan users.');
            return;
        } else {
            await this.page.goBack(); // Navigate back to Data Source page
        }

        await this.webUrl.click();
        await this.urlInput.fill(process.env.WEB_URL || '');
        await this.page.waitForTimeout(500); // Wait for 0.5 Second
        await this.getData.click();
        await this.confirmToUse.check();
        await this.page.waitForTimeout(30000); // Wait for 30 Seconds to complete the import  
        const status = await this.uploadStatus.textContent();
        console.info(`Web URL upload status: ${status}`);
    }
}