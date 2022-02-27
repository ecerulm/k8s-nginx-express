#!/bin/bash
set -euo pipefail
OUTFILE=nginx.conf
CURRENT_SCRIPT_DIR=$(dirname $(realpath $BASH_SOURCE))

NGINX_ROOT="${CURRENT_SCRIPT_DIR}/html"

TEMPLATE_FILE="$CURRENT_SCRIPT_DIR/nginx.conf.template"
echo "Read template from $TEMPLATE_FILE "
TEMPLATE=$(cat "$TEMPLATE_FILE")

# Substitute %%ROOT%% in the template with the value of $NGINX_ROOT
TEMPLATED_CONTENT=${TEMPLATE//%%ROOT%%/$NGINX_ROOT} 

# Generate a nginx.conf file with an absolute path matching the actual location of this script
cat <<< "${TEMPLATED_CONTENT}" > "$CURRENT_SCRIPT_DIR/$OUTFILE"

nginx -c "$CURRENT_SCRIPT_DIR/nginx.conf"