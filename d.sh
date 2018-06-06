#!/bin/sh

# 手动部署，CI 部署的替代方案

set -e

yarn run clean
yarn run build
cp README.md public/README.md
yarn run deploy

echo '-- >> 已部署于 master 分支 << --'
