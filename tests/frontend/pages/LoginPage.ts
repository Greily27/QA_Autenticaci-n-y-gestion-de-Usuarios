import { expect, type Page } from '@playwright/test';
export class LoginPage {
    constructor(private readonly page: Page) { }
    async goto() {
        await this.page.goto('/account/login');
        await expect(this.page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();
    }
    async login(email: string, password: string) {
        await this.page.locator('#customer_email').fill(email);
        await this.page.locator('#customer_password').fill(password);
        await this.page.locator('form[action*="/account/login"] [type="submit"]').click();
    }
    async isBlockedByCaptcha(): Promise<boolean> {
        const remainsInLogin = /\/account\/login(?:$|[/?])/.test(this.page.url());
        const functionalErrorPresent = await this.page.locator('.errors, [role="alert"]')
            .first()
            .isVisible()
            .catch(() => false);
        const formStillPresent = await this.page
            .locator('form[action*="/account/login"]')
            .isVisible()
            .catch(() => false);
        return remainsInLogin && formStillPresent && !functionalErrorPresent;
    }
    async expectLoginSuccessful() {
        await expect(this.page).toHaveURL(/\/account(?:$|[/?](?!login))/);
        await expect(this.page.getByRole('link', { name: /log out/i }).first()).toBeVisible();
    }
    async expectLoginError() {
        await expect(this.page).toHaveURL(/\/account\/login/);
        await expect(this.page.locator('.errors, [role="alert"]').first()).toContainText(/incorrect|invalid/i, {
            timeout: 10_000,
        });
    }
}