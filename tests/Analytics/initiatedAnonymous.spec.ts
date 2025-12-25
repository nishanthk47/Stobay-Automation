import { analyticsTest } from "../../src/constants";

analyticsTest('Initiate Anonymous User Chat Session', async ({ analytics }) => {
    await analytics.initiatedAnonymousUsers();
});