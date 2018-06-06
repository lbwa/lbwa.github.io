#!/bin/sh

# 此脚本仅用于 CI 部署，不用于手动部署，另请查看同级目录下的 .travis.yml

set -e

yarn run build
cp README.md public/README.md
cd public

git init
git add -A
git commit -m "$1"

git push -f https://${BLOG_TOKEN}@github.com/lbwa/lbwa.github.io.git master

echo '-- >> 已部署于 master 分支 << --'

cd -
