import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';


export class MyProfile {
    gender: string = 'Male'; // Default gender (if needed change to Female || Other)

    page: Page;
    profileVerified: Locator;
    myProfile: Locator;
    verifyProfilePage: Locator;
    editButton: Locator;
    personalInfoTitle: Locator;
    nameInput: Locator;
    genderInput: Locator;
    mobileInput: Locator;
    aboutYouInput: Locator;
    updateButton: Locator;
    formErrorMessage: Locator;
    businessInfoTitle: Locator;
    purposeOfUseInput: Locator;
    lineOfBusinessInput: Locator;
    addressInfoTitle: Locator;
    cityInput: Locator;
    stateInput: Locator;
    noResultsFound: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileVerified = page.locator('[class="lg:p-2 pl-4 ml-auto my-auto"]');
        this.myProfile = page.getByText('My Profile');
        this.verifyProfilePage = page.locator('["flex flex-col w-full md:w-[70%]"]');
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.personalInfoTitle = page.getByText('Personal Information');
        this.nameInput = page.getByPlaceholder('Enter here');
        this.genderInput = page.getByText(this.gender);
        this.mobileInput = page.getByPlaceholder('Enter your mobile number');
        this.aboutYouInput = page.locator('[id="about"]');
        this.updateButton = page.getByRole('button', { name: 'Update' });
        this.formErrorMessage = page.locator('[class="text-red-500 text-sm"]');
        this.businessInfoTitle = page.getByText('Business Information');
        this.purposeOfUseInput = page.getByPlaceholder('Select').first();
        this.lineOfBusinessInput = page.getByPlaceholder('Select').nth(1);
        this.addressInfoTitle = page.getByText('Address');
        this.cityInput = page.locator('[id="city"]');
        this.stateInput = page.getByPlaceholder('Type to search');
        this.noResultsFound = page.locator('[class="p-2 text-gray-500"]');
    }

    async navigateToMyProfile() {
        await this.profileVerified.click();
        await this.myProfile.click();
        await this.page.waitForTimeout(2000); // Wait for 2 Seconds
        await expect(this.verifyProfilePage).toBeVisible();
        console.info('Navigated to My Profile page successfully');
    }

    async personalInfoEdit(firstName: string, lastName: string, mobileNumber: string, aboutYou?: string) {
        // Form Navigation and Tile Verification
        await this.editButton.first().click();
        await expect(this.personalInfoTitle).toBeVisible();

        // Fill Personal Information Form
        await this.nameInput.first().fill(firstName);
        await this.nameInput.nth(1).fill(lastName);
        await this.genderInput.click();
        await this.mobileInput.fill(mobileNumber);
        await this.aboutYouInput.fill(aboutYou || ''); // Optional about you
    }
    async expectNoFormErrors() {
        await this.updateButton.click();
        await this.page.waitForTimeout(1000); // Wait for 1 Second
        if (await this.formErrorMessage.first().isVisible() || await this.formErrorMessage.nth(1).isVisible() || await this.formErrorMessage.nth(2).isVisible()) {
            console.error('Form submission failed due to validation errors: ', await this.formErrorMessage.allTextContents());
        }
        else {
            console.info('Information updated successfully.');
        }
    }

    async businessInfoEdit() {
        // Form Navigation and Tile Verification
        await this.editButton.nth(1).click();
        await expect(this.businessInfoTitle).toBeVisible();
    }

    async business_purpose(purpose: 'Other' | 'Personal' | 'Business') {
        await this.purposeOfUseInput.click();
        await this.page.getByText(purpose).click();
    }

    async business_lineOfBusiness(businessLine: 'Job Search' | 'Personal Brand Building' | 'Social Profile') {
        await this.lineOfBusinessInput.click();
        await this.page.getByText(businessLine).click();
    }

    async addressInfoEdit(cityName: string) {
        await this.editButton.nth(2).click();
        await expect(this.addressInfoTitle).toBeVisible();
        await this.cityInput.fill(cityName);
    }

    async address_state(stateName: string) {
        await this.stateInput.click();
        await this.stateInput.fill(stateName);
        await this.page.waitForTimeout(500); // Wait for 0.5 Second to load dropdown options
        if (await this.noResultsFound.isVisible()) {
            console.error(`State "${stateName}" not found in the dropdown options.`);
        } else {
            await this.page.getByText(stateName).click();
        }
    }
}