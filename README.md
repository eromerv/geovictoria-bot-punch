# Geovictoria Punch v1.0.1

Proceso automatizado con Puppeteer que facilita el registro de `Ingreso` o `Salida` en Geovictoria, basándose en el último marcaje efectuado.

```bash
# Configurar credenciales en archivo .env
LOGIN_PAGE_URL="https://clients.geovictoria.com/account/login"
WEB_PUNCH_API="https://web-punch-gv.geovictoria.com/api/WebPunch"
HOLIDAYS_API="https://apis.digital.gob.cl/fl/feriados"
GEO_USERNAME=""  
GEO_PASSWORD=""
```
### Importante:

Por defecto, está configurado con `headless: false`, lo que significa que levantará el navegador en el momento de ejecutar. Se puede modificar esta configuración si se prefiere ejecutar el proceso en segundo plano (background).


```js
// Para registrar el marcaje en Geovictoria, descomente la línea indicada a continuación.
await axiosInstance.get(savePunchUrl);

// Descomente para habilitar el refresco de página (es necesario headless: false).
page.load()
```


#### Feriados

El script verifica si el día actual es laboral (lunes a viernes) y consulta la API de feriados de Chile para identificar feriados. Estas comprobaciones permiten automatizar el proceso mediante un cron.

```js
async checkCurrentDate()
```

### Configurar Cron
A continuación se explica cómo configurar una tarea cron en macOS:

1. Abrir terminal.
2. Ingrese el siguiente comando en la terminal: `crontab -e`
3. Editar crontab: 

```bash
# Configurar Ingreso (L-V a las 8:45 AM)
45 8 * * 1-5 /path/to/script.sh

# Configurar Salida (L-V a las 17:00 PM)
0 17 * * 1-5 /path/to/script.sh
```
4. Guardar y Salir. 🥸

> Dentro de este repositorio, encontrarás un ejemplo de script.sh que te ayudará a automatizar tu registro de marcajes.

### How to Run

```bash
# Install dependencies
node i

# Run
node punch.js
```