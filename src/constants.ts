import { test as base } from '@playwright/test';
import { LogIn } from './logIn';
import { MyProfile } from './myProfile';
import { Settings } from './settings';
import { DataSource } from './dataSource';
import { Bots } from '../src/bots';
import { Leads } from './lead';
import { Chat } from '../src/chats';

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

export const settingsTest = base.extend<{ settings: Settings }>({
    settings: async ({ page }, use) => {
        const settingsObj = new Settings(page);
        await use(settingsObj);
    },
});

export const dataSourceTest = base.extend<{ dataSource: DataSource }>({
    dataSource: async ({ page }, use) => {
        const dataSourceObj = new DataSource(page);
        await use(dataSourceObj);
    },
});

export const botsTest = base.extend<{ bots: Bots }>({
    bots: async ({ page }, use) => {
        const botsObj = new Bots(page);
        await use(botsObj);
    },
});

export const leadsTest = base.extend<{ leads: Leads, bots: Bots, myProfile: MyProfile, chat: Chat }>({
    leads: async ({ page }, use) => {
        const leadsObj = new Leads(page);
        await use(leadsObj);
    },
    bots: async ({ page }, use) => {
        const botsObj = new Bots(page);
        await use(botsObj);
    },
    myProfile: async ({ page }, use) => {
        const myProfileObj = new MyProfile(page);
        await use(myProfileObj);
    },
    chat: async ({ page }, use) => {
        const chatObj = new Chat(page);
        await use(chatObj);
    },
});