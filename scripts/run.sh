#!/usr/bin/env bash

set -x
set -eo pipefail

function updateGit () {
  git checkout .
  git pull
}

function runSource () {
  rm -f package-lock.json
  npm i
  npm run build
  npm start
}

function runDocker () {
  docker pull wechaty/friday
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
    UPDATE_CMD=updateGit
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
