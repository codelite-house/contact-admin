#!/bin/sh
set -e

envsubst '$API_URL' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

envsubst '$ZITADEL_ISSUER $ZITADEL_CLIENT_ID $ZITADEL_PROJECT_ID' \
  < /usr/share/nginx/html/env.js.template \
  > /usr/share/nginx/html/env.js

exec nginx -g 'daemon off;'
