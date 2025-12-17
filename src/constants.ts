import { test as base } from '@playwright/test';
import { LogIn } from './logIn';
import { MyProfile } from './myProfile';

export const logInTest = base.extend<{ logIn: LogIn }>({
    logIn: async ({ page }, use) => {
        const logInobj = new LogIn(page);
        await use(logInobj);
    },
});

export const myProfileTest = base.extend<{ myProfile: MyProfile }>({
    myProfile: async ({ page }, use) => {
        const myProfileObj = new MyProfile(page);
        await use(myProfileObj);
    },
});