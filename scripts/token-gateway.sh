#!/usr/bin/env bash

set -e

# https://stackoverflow.com/a/60406814/1123955
export $(grep -v ^\# .env | xargs)

#
# Huan(202110): the latest version that Puppet PadLocal@0.4 is compatible with is wechaty@0.78
#
#   PadLocal must adaported with Wechaty Puppet API v1.0 before it can be used with Wechaty 1.0
#
WECHATY_IMAGE=wechaty/wechaty:0.78
docker pull "$WECHATY_IMAGE"

docker run \
  -ti \
  --name friday_wechaty_puppet_service_token_gateway \
  --rm \
  --privileged \
  --network=host \
  -e WECHATY_LOG \
  -e WECHATY_PUPPET="$TOKEN_GATEWAY_WECHATY_PUPPET" \
  -e WECHATY_PUPPET_PADLOCAL_TOKEN="$TOKEN_GATEWAY_WECHATY_PUPPET_PADLOCAL_TOKEN" \
  -e WECHATY_PUPPET_SERVER_PORT="$TOKEN_GATEWAY_WECHATY_PUPPET_SERVER_PORT" \
  -e WECHATY_TOKEN="$WECHATY_PUPPET_SERVICE_TOKEN" \
  "$WECHATY_IMAGE"
