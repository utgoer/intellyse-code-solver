#!/usr/bin/env bash

set -o errexit
set -o pipefail

function lint {
  # Lint Python code
  flake8 "${@}"
}

function format:imports {
  # Sort Python imports
  isort . "${@}"
}

function format {
  # Format Python code
  black . "${@}"
}

function quality {
  # Perform all code quality commands together
  format:imports
  format
  lint
}

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