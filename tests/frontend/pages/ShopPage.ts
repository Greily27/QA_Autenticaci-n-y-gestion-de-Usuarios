import { expect, type Page } from '@playwright/test';
export class ShopPage {
    constructor(private readonly page: Page) { }
    async addProduct(productName: string) {
        await this.page.goto('/collections/all');
        await this.page.getByRole('link', { name: new RegExp(`^${productName}`) }).first().click();
        6 / 12
        const addResponse = this.page.waitForResponse(
            response => response.url().includes('/cart/add.js') && response.ok(),
        );
        await this.page.locator('#add').click();
        await addResponse;
    }
    async openCartAndExpectProducts(productNames: string[]) {
        await this.page.goto('/cart');
        for (const name of productNames) {
            await expect(this.page.getByText(name, { exact: false }).first()).toBeVisible();
        }
        await expect(this.page.locator('input[name="updates[]"]')).toHaveCount(productNames.length);
    }
    async startCheckout() {
        await this.page.locator('[name="checkout"]').click();
    }
}