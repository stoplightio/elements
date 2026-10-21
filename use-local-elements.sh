#!/bin/bash
example=$1

cd ./examples-dev/$example

# Use the local builds instead of the published packages.
# elements-core is added as a direct dependency as well: its version satisfies the range that `elements` and
# `elements-dev-portal` ask for, so npm reuses this copy instead of looking for it on the registry.
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements\"]=\"file:../../packages/elements/dist\""
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements-dev-portal\"]=\"file:../../packages/elements-dev-portal/dist\""
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements-core\"]=\"file:../../packages/elements-core/dist\""

# npm symlinks `file:` directories by default. Copy them instead, so that the local builds resolve
# react, react-router etc. from the example's own node_modules (a symlink would pick up the repo's copies).
echo "install-links=true" > .npmrc

npx json -I -f package.json -e "this.scripts.reinstall=\"rm -rf node_modules package-lock.json && npm install\""
