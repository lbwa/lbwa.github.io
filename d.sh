#!/bin/sh

set -e

yarn run clean
yarn run build
yarn run deploy

echo '-- >> 已部署于 master 分支 << --'

cd -
