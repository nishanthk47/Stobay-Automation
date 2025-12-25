import { dataSourceTest } from '../../src/constants';

// Use the saved storage state 
dataSourceTest.use({ storageState: 'storageState.json' });

dataSourceTest.beforeEach(async ({ dataSource, page }) => {
    await page.goto(process.env.DASHBOARD_URL || '');
    await dataSource.navigateToDataSource();
});

dataSourceTest.afterEach(async ({ page }) => {
    await page.close();
});

dataSourceTest('Upload Raw Source File', async ({ dataSource }) => {
    await dataSource.uploadDataSourceFile();
});

dataSourceTest('Delete Source File', async ({ dataSource }) => {
    await dataSource.deleteDataSourceFile();
});