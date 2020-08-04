#!/usr/bin/env bash

set -x
set -eo pipefail

function update () {
  docker pull wechaty/friday
  git checkout .
  git pull
  rm -f package-lock.json
  npm i
}

function runSource () {
  npm run build
  npm start
}

function runDocker () {
  docker-compose up
}

function main () {

  case "$1" in
    source)
      RUN_CMD=runSource
      ;;

    *)
      ;&
    docker)
      RUN_CMD=runDocker
      ;;
  esac

case "$2" in
  update)
    UPDATE_CMD=update
    ;;
  *)
    UPDATE_CMD=true
    ;;
  esac

  while true
  do
    "$UPDATE_CMD"
    "$RUN_CMD"
    sleep 1
  done
}

main "$@"
