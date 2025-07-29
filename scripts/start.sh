#!/usr/bin/env bash
# shellcheck disable=SC1091

throw() { printf "fatal: %s\n" "$1" >&2; exit 1; }
print_cmd() { printf "\$ %s\n" "$*"; }
execute() { print_cmd "$@"; "$@" || throw "Failed to execute '$1'"; }

#region resolve the script directory
SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname -- "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
SCRIPT_DIR=$( cd -P "$( dirname -- "$SOURCE" )" >/dev/null 2>&1 && pwd )
#endregion resolve the script directory

execute cd "${SCRIPT_DIR}/..";
execute source "scripts/trust-custom-ca-cert.sh";
execute bun start
