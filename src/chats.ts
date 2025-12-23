import { Page, Locator } from 'playwright';

export class Chat {
    page: Page;
    conversation: Locator;
    sendButton: Locator;
    chatResponse: Locator;
    leadFrom: Locator;
    name: Locator;
    phone: Locator;
    email: Locator;
    continueToChat: Locator;

    constructor(page: Page) {
        this.page = page;
        this.conversation = page.getByRole('textbox', { name: 'Type your message...' });
        this.sendButton = page.locator('path[d^="M15.5655"]');
        this.chatResponse = page.locator('[class="text-background break-words"]');
        this.leadFrom = page.getByText('Lead Form', { exact: true });
        this.name = page.getByRole('textbox', { name: 'Enter Name' });
        this.phone = page.getByRole('textbox', { name: 'Enter Phone' });
        this.email = page.getByRole('textbox', { name: 'Enter Email' });
        this.continueToChat = page.getByRole('button', { name: 'Continue to chat' });
    }

    async navigateToChat(botName?: string) {
        // Navigation logic to Chat page
        await this.page.goto(`${process.env.CHAT_URL || ''}${botName || ''}`);
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds 
        console.info(`Navigated to chat page of bot: ${botName}`);
    }

    async chatWithBot(message: string, chatCount: number, name: string, phone: string, email: string) {
        // Sending message chatCount times
        for (let i = 1; i <= chatCount; i++) {

            // Capture Lead Form if appears
            if (await this.leadFrom.isVisible() && await this.continueToChat.isVisible()) {
                // Fill Lead Form details
                await this.name.fill(name);
                await this.phone.fill(phone);
                await this.email.fill(email);
                await this.page.waitForTimeout(1000); // Wait for 1 Second    
                await this.continueToChat.click();
            }
            await this.page.waitForTimeout(2000); // Wait for 2 Seconds    

            await this.conversation.fill(message);
            await this.sendButton.click();
            await this.page.waitForTimeout(5000); // Wait for 5 Seconds
            await this.chatResponse.nth(i).waitFor(); // Wait for the chat response to appear
            const responseText = await this.chatResponse.nth(i).innerText();
            console.info(`Chat ${i}: Bot Response - ${responseText}`);
        }
    }
}