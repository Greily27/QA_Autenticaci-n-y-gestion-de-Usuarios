export const testData = {
validUser: {
email: process.env.TEST_USER_EMAIL ?? '',
password: process.env.TEST_USER_PASSWORD ?? '',
},
invalidUser: {
email: process.env.INVALID_USER_EMAIL ?? 'usuario.inexistente@example.com',
password: process.env.INVALID_USER_PASSWORD ?? 'PasswordIncorrecto123!',
},
reqres: {
apiKey: process.env.REQRES_API_KEY ?? '',
},
checkout: {
firstName: 'QA',
lastName: 'Treda',
address: 'Calle 100 # 10-20',
city: 'Bogota',
postalCode: '110111',
country: 'Colombia',
},
} as const;
export function requireEnv(name: string, value: string): string {
if (!value) throw new Error(`Falta ${name}. Copia .env.example a .env y configura el valor.`);
return value;
}