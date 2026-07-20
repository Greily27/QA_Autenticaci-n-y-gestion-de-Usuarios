import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { requireEnv, testData } from '../../fixtures/test-data';
test('FE-01 - usuario autenticado agrega dos productos y llega a confirmación', async ({ page }) => {
    const email = requireEnv('TEST_USER_EMAIL', testData.validUser.email);
    const password = requireEnv('TEST_USER_PASSWORD', testData.validUser.password);
    const login = new LoginPage(page);
    const shop = new ShopPage(page);
    const checkout = new CheckoutPage(page);
    await test.step('Autenticarse', async () => {
        await login.goto();
        await login.login(email, password);
        test.skip(
            await login.isBlockedByCaptcha(),
            'Shopify hCaptcha bloqueó el login automatizado antes de validar las credenciales.',
        );
        await login.expectLoginSuccessful();
    });
    await test.step('Agregar dos productos y validar el carrito', async () => {
        await shop.addProduct('Black heels');
        await shop.addProduct('Bronze sandals');
        await shop.openCartAndExpectProducts(['Black heels', 'Bronze sandals']);
    });
    await test.step('Completar datos y validar la pantalla final antes del pago', async () => {
        await shop.startCheckout();
        await checkout.completeContactAndDelivery(email, testData.checkout);
        await checkout.expectConfirmationScreen();
    });
});