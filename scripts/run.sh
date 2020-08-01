#!/usr/bin/env bash

set -x
set -eo pipefail

function runSource () {
  git checkout .
  git pull
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
  while true
  do
    runDocker
    sleep 1
  done
}

main
