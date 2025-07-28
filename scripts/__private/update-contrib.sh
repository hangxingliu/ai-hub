#!/usr/bin/env bash

FILES=(
  packages/common-utils/src/json-schema/             src/utils/json-schema/

  packages/cli-utils/src/colors/                     src/utils/colors/

  packages/network/src/env.ts                        src/utils/http-proxy/
  packages/network/src/utils/proxy-agent.ts          src/utils/http-proxy/

  packages/cli-utils/src/before-exit.ts              src/utils/
  packages/common-utils/src/error.ts                 src/utils/
  packages/common-utils/src/strings/format-size.ts   src/utils/
  packages/common-utils/src/strings/format-date.ts   src/utils/
);

SED_EXPRS=(
  's|\./contrib/error\.js|\./error\.js|g'            src/utils/before-exit.ts
)

throw() { printf "fatal: %s\n" "$1" >&2; exit 1; }
print_cmd() { printf "\$ %s\n" "$*"; }
execute() { print_cmd "$@"; "$@" || throw "Failed to execute '$1'"; }
get_stdout() { print_cmd "$@"; get_stdout_result="$("$@")"; }

PROJECT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )/../.." &> /dev/null && pwd )";
[ -n "$MY_TS_LIBS_DIR" ] || throw "the env \$MY_TS_LIBS_DIR is missing";

update_main() {
  while [ "${#@}" -gt 0 ]; do
    src="$1"; shift;
    dest="$1"; shift;
    [ -z "$dest" ] && break;
    dest="${PROJECT_DIR}/${dest}";
    [ -d "$(dirname -- "$dest")" ] || execute mkdir -p "$(dirname -- "$dest")";
    execute rsync -a "${MY_TS_LIBS_DIR}/${src}" "$dest";
  done
}

sed_main() {
  while [ "${#@}" -gt 0 ]; do
    expr="$1"; shift;
    dest="$1"; shift;
    [ -z "$dest" ] && break;
    get_stdout sed "$expr" "${PROJECT_DIR}/${dest}";
    echo "$get_stdout_result" > "${PROJECT_DIR}/${dest}";
  done
}

update_main "${FILES[@]}";
sed_main "${SED_EXPRS[@]}";
