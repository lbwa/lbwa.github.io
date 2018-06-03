#!/bin/sh

set -e

yarn run build
cd ./public

git init
git add -A
git commit -m "$1"

git push -f https://${BLOG_TOKEN}@github.com/lbwa/lbwa.github.io.git master:master

echo '-- >> 分支 master 部署完成 << --'

cd -
