import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../../fixtures/test-data';

test('FE-02 - muestra error con credenciales inválidas', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testData.invalidUser.email, testData.invalidUser.password);
    test.skip(
        await login.isBlockedByCaptcha(),
        'Shopify hCaptcha bloqueó el envío antes de que la aplicación generara el error funcional.',
    );
    await login.expectLoginError();
});