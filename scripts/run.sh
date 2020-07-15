#!/usr/bin/env bash -x

set -eo pipefail

function update () {
  git checkout .
  git pull
  rm -f package-lock.json
  npm i
  npm run build
}

function main () {
  LOG_FILE=friday.log

  while true
  do
    if update; then
      node dist/src/main.js | tee "$LOG_FILE" || true
    fi
    sleep 1
  done
}

main
