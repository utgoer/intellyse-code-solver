#!/usr/bin/env bash

set -o errexit
set -o pipefail

function dbuild {
  docker compose build
}

function dup {
  docker compose up
}

function dstart {
  dbuild
  dup
}



TIMEFORMAT=$'\nTask completed in %3lR'
time "${@}"