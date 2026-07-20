# Casos de prueba

## Frontend — SauceDemo

### Casos positivos

**FE-01 — Login válido y checkout**

- Iniciar sesión con un usuario válido.
- Agregar `Black heels` y `Bronze sandals` al carrito.
- Confirmar que el carrito contiene dos productos.
- Completar los datos del checkout.
- Validar que se muestre la sección de pago.
- Estado: automatizado en `tests/frontend/specs/checkout.spec.ts`.

### Casos negativos

**FE-02 — Credenciales inválidas**

- Ingresar un correo y una contraseña incorrectos.
- Validar que no se inicie sesión.
- Validar que se muestre un mensaje de error.
- Estado: automatizado en `tests/frontend/specs/login-negative.spec.ts`.

**FE-03 — Campos de login vacíos**

- Enviar el formulario sin correo ni contraseña.
- Validar que se indiquen los campos obligatorios.
- Estado: manual.

**FE-04 — Contraseña vacía**

- Ingresar únicamente el correo.
- Validar que se solicite la contraseña.
- Estado: manual.

**FE-05 — Dirección de checkout vacía**

- Llegar al checkout sin completar la dirección.
- Validar que no permita continuar.
- Validar los mensajes de los campos requeridos.
- Estado: manual.

### Casos de borde

**FE-06 — Correo con espacios o mayúsculas**

- Probar variaciones del correo registrado.
- Validar que el sistema normalice el valor o muestre un error claro.
- Estado: manual.

**FE-07 — Producto repetido**

- Agregar varias veces el mismo producto.
- Validar que la cantidad y el total se actualicen correctamente.
- Estado: manual.

**FE-08 — Sesión expirada**

- Expirar la sesión durante el checkout.
- Validar que el sistema redirija de forma segura.
- Comprobar que el estado del carrito sea consistente.
- Estado: manual.

## Backend — ReqRes

### Casos positivos

**API-01 — Consultar un usuario**

- Ejecutar `GET /api/users/2` con una API key válida.
- Validar el código HTTP 200.
- Validar la estructura y los tipos del JSON.
- Estado: automatizado en `tests/backend/specs/users.spec.ts`.

**API-02 — Crear un usuario**

- Ejecutar `POST /api/users` enviando nombre y cargo.
- Validar el código HTTP 201.
- Validar que la respuesta contenga los datos enviados, un `id` y `createdAt`.
- Estado: automatizado en `tests/backend/specs/users.spec.ts`.

### Casos negativos

**API-03 — Usuario inexistente**

- Consultar `GET /api/users/99999`.
- Validar el código HTTP 404.
- Validar que la respuesta de error sea controlada.
- Estado: manual.

**API-04 — Solicitud sin API key**

- Ejecutar las solicitudes sin el encabezado `x-api-key`.
- Validar un código HTTP 401 o 403.
- Validar que se muestre un mensaje de error claro.
- Estado: manual.

### Casos de borde

**API-05 — Payload vacío**

- Crear un usuario enviando `{}`.
- Validar que la respuesta corresponda con las reglas de la API.
- Comprobar que no se produzca un error 5xx.
- Estado: manual.

**API-06 — Valores excesivamente largos**

- Enviar un nombre y un cargo con una longitud elevada.
- Validar que la API controle los límites sin generar errores internos.
- Estado: manual.

## Datos y consideraciones

- Las credenciales se configuran en el archivo `.env`.
- La API key se configura mediante `REQRES_API_KEY`.
- No se almacenan credenciales reales dentro del código.
- El flujo de checkout termina antes de realizar un pago.
- hCaptcha puede impedir la ejecución automática del login.
