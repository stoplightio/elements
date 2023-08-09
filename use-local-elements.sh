#!/bin/bash
example=$1

cd ./examples-dev/$example

npx json -I -f package.json -e "this.resolutions={
\"@jpmorganchase/elemental\": \"file:../../packages/elements/dist\",
\"@jpmorganchase/elemental-dev-portal\": \"file:../../packages/elements-dev-portal/dist\",
\"@jpmorganchase/elemental-core\": \"file:../../packages/elements-core/dist\"
}"

npx json -I -f package.json -e "this.dependencies[\"@jpmorganchase/elemental\"]=\"file:../../packages/elements/dist\""
npx json -I -f package.json -e "this.dependencies[\"@jpmorganchase/elemental-dev-portal\"]=\"file:../../packages/elements-dev-portal/dist\""

npx json -I -f package.json -e "this.scripts.reinstall=\"rm -rf node_modules && yarn install\""
