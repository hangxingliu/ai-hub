#!/usr/bin/env bash
#
# usage: source ./scripts/trust-custom-ca-cert.sh
#

ca_file="storage/ca-cert.pem";
project_dir="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )/.." &> /dev/null && pwd )";

#
ca_file="${project_dir}/${ca_file}";
if [ -f "$ca_file" ]; then
  echo "export NODE_EXTRA_CA_CERTS=${ca_file}" >&2;
  export NODE_EXTRA_CA_CERTS="${ca_file}";
fi
unset ca_file project_dir;
