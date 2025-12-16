import { test as base } from '@playwright/test';
import { LogIn } from './logIn';

export const logInTest = base.extend<{ logIn: LogIn }>({
    logIn: async ({ page }, use) => {
        const logInobj = new LogIn(page);
        await use(logInobj);
    },
});