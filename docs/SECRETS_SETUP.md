# Guía de Configuración de Secrets para GitHub Actions

Para que el pipeline de CI/CD funcione correctamente, es necesario configurar los siguientes "Secrets" en el repositorio de GitHub.

## 1. Acceder a la Configuración
1. Ve a tu repositorio en GitHub.
2. Haz clic en **Settings**.
3. En el menú lateral izquierdo, busca **Secrets and variables** > **Actions**.
4. Haz clic en **New repository secret**.

## 2. Secrets Requeridos

### Vercel (Despliegues)
Estos son necesarios para `preview.yml` y `production.yml`.

| Nombre | Descripción | Cómo obtenerlo |
|--------|-------------|----------------|
| `VERCEL_TOKEN` | Token de acceso a Vercel CLI | En Vercel: Account Settings > Tokens > Create Token |
| `VERCEL_ORG_ID` | ID de tu organización/cuenta | En el proyecto Vercel: Settings > General > copiar `Org ID` |
| `VERCEL_PROJECT_ID` | ID del proyecto | En el proyecto Vercel: Settings > General > copiar `Project ID` |

### Integraciones (Tests y Build)
Estos son necesarios para `ci.yml` (Tests E2E y Build).

| Nombre | Descripción | Valor Sugerido (Dev/Test) |
|--------|-------------|---------------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de Supabase | Tu URL de proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Key anónima de Supabase | Tu Anon Key de Supabase |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Key pública de Stripe | `pk_test_...` (Stripe Dashboard) |
| `TEST_SUPABASE_URL` | URL Supabase para Tests | Igual que URL principal o entorno dedicado de tests |
| `TEST_SUPABASE_ANON_KEY` | Key Supabase para Tests | Igual que Anon Key principal o entorno dedicado |

### Opcionales
| Nombre | Descripción |
|--------|-------------|
| `CODECOV_TOKEN` | Para reporte de coverage | De codecov.io (si usas el servicio) |
| `SLACK_WEBHOOK` | Notificaciones a Slack | Webhook URL de Slack App |

## 3. Confirmación
Una vez configurados estos secrets, el pipeline podrá:
1. Construir la aplicación conectando a los servicios.
2. Ejecutar tests que requieren variables de entorno.
3. Desplegar a Vercel automáticamente.
