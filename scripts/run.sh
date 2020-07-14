#!/usr/bin/env bash

LOG_FILE=friday.log

while true do
  git checkout .
  git pull
  rm -f package-lock.json
  npm i
  npm run build
  node dist/src/main.js | tee "$LOG_FILE"
  sleep 1
done
