# Automatización QA - Treda Solutions

Suite de pruebas funcionales para el flujo de autenticación, carrito y checkout de
[SauceDemo](https://sauce-demo.myshopify.com/), y para los endpoints de usuarios de
[ReqRes](https://reqres.in/).

## Tecnologías

- **TypeScript**: aporta tipado estático y mejora la mantenibilidad.
- **Playwright**: permite probar interfaz web y API con una sola herramienta, incluye
  esperas automáticas, trazas, capturas, video y reporte HTML.
- **Page Object Model**: separa los selectores y acciones de las pruebas frontend.

## Requisitos

- Node.js 20 o superior.
- Una cuenta válida en SauceDemo Shopify.
- Una API key gratuita de ReqRes.

## Instalación y ejecución

```bash
npm ci
npx playwright install chromium
```

Copia `.env.example` como `.env` y completa los valores reales:

```env
TEST_USER_EMAIL=correo_de_prueba
TEST_USER_PASSWORD=contraseña_de_prueba
INVALID_USER_EMAIL=usuario.inexistente@example.com
INVALID_USER_PASSWORD=PasswordIncorrecto123!
REQRES_API_KEY=reqres_free_xxxxxxxxx
```

Ejecuta toda la suite o cada componente por separado:

```bash
npm test
npm run test:frontend
npm run test:backend
```

Para observar el navegador o abrir el último reporte HTML:

```bash
npm run test:headed
npm run report
```

Los resultados se guardan en `playwright-report/` y `test-results/`. Si Shopify
activa hCaptcha, los casos de login se omiten con una causa explícita porque el reto
no debe intentar evadir ese control de seguridad.

## Documentación

- [Plan de pruebas](docs/test-plan.md)
- [Matriz de casos de prueba](docs/test-cases.md)

## Estructura

```text
tests/
├── backend/specs/       # Pruebas GET y POST de ReqRes
├── fixtures/            # Datos y variables de entorno
└── frontend/
    ├── pages/           # Page Objects
    └── specs/           # Escenarios funcionales
```

## Mejoras propuestas

Con más tiempo se añadirían ESLint y Prettier, validación JSON Schema para los
contratos API, pruebas en más navegadores, datos de prueba creados y eliminados de
forma automática, y monitoreo de tendencias/flakiness. El workflow de GitHub Actions
ya ejecuta la suite en cada push y pull request y conserva los reportes como
artefactos; requiere configurar los secretos `TEST_USER_EMAIL`,
`TEST_USER_PASSWORD` y `REQRES_API_KEY`.
