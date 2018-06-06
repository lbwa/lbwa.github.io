#!/bin/sh

set -e

yarn run build
cd public

git init
git add -A
git commit -m "$1"

git push -f https://${BLOG_TOKEN}@github.com/lbwa/lbwa.github.io.git master

echo '-- >> 已部署于 master 分支 << --'

cd -
