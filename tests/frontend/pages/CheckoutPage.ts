import { expect, type Page } from '@playwright/test';
import type { testData } from '../../fixtures/test-data';
type CheckoutData = typeof testData.checkout;
export class CheckoutPage {
    constructor(private readonly page: Page) { }
    async completeContactAndDelivery(email: string, data: CheckoutData) {
        await expect(this.page).toHaveURL(/\/checkouts\//);
        await this.page.locator('input[name="email"]').fill(email);
        await this.page.locator('select[name="countryCode"]').selectOption({ label: data.country });
        await this.page.locator('input[name="firstName"]:visible').fill(data.firstName);
        await this.page.locator('input[name="lastName"]:visible').fill(data.lastName);
        await this.page.locator('input[name="address1"]:visible').fill(data.address);
        await this.page.locator('input[name="city"]:visible').fill(data.city);
        await this.page.locator('input[name="postalCode"]:visible').fill(data.postalCode);
    }
    async expectConfirmationScreen() {
        await expect(this.page.getByRole('heading', { name: /payment/i })).toBeVisible();
        await expect(this.page.getByRole('button', { name: /pay now/i })).toBeVisible();
        await expect(this.page.getByText(/subtotal.*2 items/i)).toBeVisible();
    }
}