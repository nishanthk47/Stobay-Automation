import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export class DataSource {
    page: Page;
    dataSource: Locator;
    dataSourceVerified: Locator;
    fileUploadButton: Locator;
    uploadInput: Locator;
    uploadStatus: Locator;
    deleteButton: Locator;
    confimationYes: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dataSource = page.getByText('Data Source').first();
        this.dataSourceVerified = page.locator('[class="w-full flex overflow-x-auto textAnsNo"]');
        this.fileUploadButton = page.getByRole('button', { name: 'File Upload' });
        this.uploadInput = page.locator('[class="flex text-sm font-inter mt-3"]');
        this.uploadStatus = page.locator('[class="px-4 pt-5 pb-3"]').nth(4);
        this.deleteButton = page.locator('path[d^="M7.42432"]');
        this.confimationYes = page.getByRole('button', { name: 'Delete' });
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
        await this.page.waitForTimeout(10000); // Wait for 10 Seconds to complete the upload
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
}