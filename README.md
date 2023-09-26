# Geovictoria Punch v1.0.0

Proceso automatizado con Puppeteer que facilita el registro de `Ingreso` o `Salida` en Geovictoria, basándose en el último marcaje efectuado.

```bash
# Configurar credenciales en archivo .env
LOGIN_PAGE_URL="https://clients.geovictoria.com/account/login"
WEB_PUNCH_API="https://web-punch-gv.geovictoria.com/api/WebPunch"
GEO_USERNAME=""  
GEO_PASSWORD=""
```
### Importante:

Por defecto, está configurado con `headless: false`, lo que significa que levantará el navegador en el momento de ejecutar. Se puede modificar esta configuración si se prefiere ejecutar el proceso en segundo plano (background).


```bash
# Para registrar el marcaje en Geovictoria, se debe descomentar la línea 47 del código.
await axios.get(savePunchUrl);
```

### How to Run

```bash
# Install dependencies
node i

# Run
node punch.js
```