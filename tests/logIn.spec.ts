import { logInTest } from '../src/constants';

logInTest('Login with Google', async ({ page, logIn }) => {
    // Navigate to URL
    await page.goto(process.env.URL || '');

    await logIn.logInWithGoogle();

    // Storage State can be saved after login for reuse in other tests
    await page.context().storageState({ path: 'storageState.json' });
    console.info('Storage State saved successfully.');

    // Verfiy Login
    await logIn.verifyLogin();
});