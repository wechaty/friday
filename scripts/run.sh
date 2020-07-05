#!/usr/bin/env bash

set -e

LOG_FILE=friday.log

while true
  do git checkout .
  git pull
  rm -f package-lock.json
  npm i
  npm run build
  node dist/src/main.js | tee "$LOG_FILE" || true
  sleep 1
done
