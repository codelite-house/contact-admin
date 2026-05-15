#!/bin/sh
set -e
envsubst '$ZITADEL_ISSUER $ZITADEL_CLIENT_ID $API_URL' \
  < /usr/share/nginx/html/env.js.template \
  > /usr/share/nginx/html/env.js
exec nginx -g 'daemon off;'
