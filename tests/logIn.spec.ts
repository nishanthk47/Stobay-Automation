import { test } from '@playwright/test';
import { LogIn } from '../src/logIn';

test('Login with Google', async ({ page }) => {
    await page.goto(process.env.URL || '');

    const logIn = new LogIn(page);
    await logIn.logInWithGoogle();

    // Storage State can be saved after login for reuse in other tests
    await page.context().storageState({ path: 'storageState.json' });
    console.info('Storage State saved successfully.');

    // Verfiy Login
    await logIn.verifyLogin();
});