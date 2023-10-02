#!/bin/sh
export LOGIN_PAGE_URL="https://clients.geovictoria.com/account/login"
export WEB_PUNCH_API="https://web-punch-gv.geovictoria.com/api/WebPunch"
export HOLIDAYS_API="https://apis.digital.gob.cl/fl/feriados"
export GEO_USERNAME=""
export GEO_PASSWORD=""

# Editar según tus preferencias/configuraciones.
NODE="/Users/<user>/.nvm/versions/node/v19.7.0/bin/node"
PUNCH_DIR="/Users/<user>/Tasks/Punch"
LOG_OUTPUT="${TASK_DIR}/output.log"

# Para registrar el resultado de la ejecución, asegúrate de contar con los permisos de escritura necesarios.
#"${NODE}" "${PUNCH_DIR}/punch.js" >> "${LOG_OUTPUT}" 2>&1

"${NODE}" "${PUNCH_DIR}/punch.js"

