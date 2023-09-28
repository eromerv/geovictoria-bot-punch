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

El script actual verifica si el día actual es un día laborable, tomando en cuenta de lunes a viernes. Adicionalmente, se conecta con la API de feriados de Chile para determinar si dicho día es un feriado. Estas validaciones facilitan la automatización del proceso mediante un `cron`.

```js
async checkCurrentDate()
```

### How to Run

```bash
# Install dependencies
node i

# Run
node punch.js
```