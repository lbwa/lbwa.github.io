#!/bin/sh

# 手动部署，CI 部署的替代方案

set -e

yarn run clean
yarn run build
cp source/README.md public/README.md
cp source/README.md README.md
yarn run deploy

echo '-- >> 已部署于 master 分支 << --'
