import { expect, test } from '@playwright/test';
import { requireEnv, testData } from '../../fixtures/test-data';
test.describe('ReqRes - usuarios', () => {
    test.beforeEach(({ request }) => {
        void request;
        requireEnv('REQRES_API_KEY', testData.reqres.apiKey);
    });
    test('API-01 - consulta un usuario y valida su contrato', async ({ request }) => {
        const response = await request.get('/api/users/2', {
            headers: { 'x-api-key': testData.reqres.apiKey },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toEqual(expect.objectContaining({
            data: {
                id: expect.any(Number),
                email: expect.stringMatching(/^[^@]+@[^@]+\.[^@]+$/),
                first_name: expect.any(String),
                last_name: expect.any(String),
                avatar: expect.stringMatching(/^https?:\/\//),
            },
            support: {
                url: expect.stringMatching(/^https?:\/\//),
                text: expect.any(String),
            },
        }));
    });
    test('API-02 - crea un usuario y retorna los datos enviados', async ({ request }) => {
        const payload = { name: 'Treda QA', job: 'Quality Engineer' };
        const response = await request.post('/api/users', {
            headers: { 'x-api-key': testData.reqres.apiKey },
            data: payload,
        });
        expect(response.status()).toBe(201);
        expect(await response.json()).toEqual(expect.objectContaining({
            ...payload,
            id: expect.any(String),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
        }));
    });
});