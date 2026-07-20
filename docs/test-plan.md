# Plan de pruebas simplificado

## Objetivo y alcance

Validar la estabilidad del flujo crítico solicitado:

- Frontend: login válido e inválido, selección de dos productos, carrito y llegada a
  la sección final de pago sin realizar un cobro.
- Backend: consulta y creación de usuarios mediante ReqRes, verificando códigos HTTP,
  datos y estructura básica del JSON.

Quedan fuera de alcance el pago real, devoluciones, administración de usuarios,
pruebas de carga, accesibilidad exhaustiva y pentesting. hCaptcha se considera una
dependencia externa: si bloquea la automatización, el test se reporta como omitido.

## Tipos de prueba

- Funcionales end-to-end sobre el camino feliz.
- Negativas para credenciales inválidas y campos obligatorios.
- Casos de borde de formato, longitud, sesión y carrito.
- API funcional y validación de contrato.
- Regresión automatizada en Chromium y CI.

## Ambiente y datos

- Sitios públicos de SauceDemo Shopify y ReqRes.
- Cuenta dedicada de prueba y API key almacenadas como variables de entorno/secretos.
- Datos de checkout ficticios; no se confirma ningún pago.

## Criterios de aceptación

- El usuario válido inicia sesión y se muestra evidencia inequívoca de sesión activa.
- El carrito contiene exactamente los dos productos elegidos.
- El checkout muestra la sección de pago, el botón `Pay now` y un resumen de dos ítems.
- Las credenciales inválidas muestran un error y no crean sesión.
- GET retorna 200 con el contrato esperado; POST retorna 201 y conserva los datos.

## Criterios de salida

- Todos los casos críticos automatizados pasan en el ambiente disponible.
- No quedan defectos críticos o altos abiertos sin aceptación explícita.
- Los fallos y omisiones por dependencias externas quedan documentados con evidencia.
- Se genera y conserva el reporte HTML (y JUnit en CI).

## Riesgos

- hCaptcha puede impedir los logins automatizados.
- El contenido, selectores o checkout de Shopify pueden cambiar sin control del equipo.
- ReqRes puede limitar solicitudes o invalidar la API key.
- Los sitios públicos pueden presentar latencia o indisponibilidad temporal.
