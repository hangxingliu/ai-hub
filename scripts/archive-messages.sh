#!/usr/bin/env bash

throw() { printf "fatal: %s\n" "$1" >&2; exit 1; }
print_cmd() { printf "\$ %s\n" "$*"; }
execute() { print_cmd "$@"; "$@" || throw "Failed to execute '$1'"; }

pushd "$( dirname -- "${BASH_SOURCE[0]}" )/../storage/logs/messages" >/dev/null || exit 1;

TARGET_TAR_GZ="archived-$(date "+%Y%m%d-%H%M%S").tar.gz";
SRC_FILES=();

while read -r file; do
  [ -z "$file" ] && continue;
  SRC_FILES+=( "$file" );
done <<< "$(find . -type f -iname '*.json')";
[ "${#SRC_FILES[@]}" -gt 0 ] || exit 0;

execute tar czvf "$TARGET_TAR_GZ" -- "${SRC_FILES[@]}";
execute rm -- "${SRC_FILES[@]}";
