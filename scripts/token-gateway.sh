#!/usr/bin/env bash

set -e

export $(grep -v ^\# .env | xargs)

WECHATY_IMAGE=wechaty/wechaty:0.77
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
