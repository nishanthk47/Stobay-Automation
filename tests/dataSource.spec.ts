import { dataSourceTest } from '../src/constants';

dataSourceTest.beforeAll(async ({ dataSource, page }) => {
    await page.goto('https://app.staging.stobay.ai/dashboard/');
    await dataSource.navigateToDataSource();
});

dataSourceTest('Upload Raw Source File', async ({ dataSource }) => {
    await dataSource.uploadDataSourceFile();
});

dataSourceTest('Delete Source File', async ({ dataSource }) => {
    await dataSource.deleteDataSourceFile();
});