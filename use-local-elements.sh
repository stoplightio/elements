#!/bin/bash
example=$1

cd ./examples-dev/$example

npx json -I -f package.json -e "this.resolutions={
\"@stoplight/elements\": \"file:../../packages/elements/dist\",
\"@stoplight/elements-dev-portal\": \"file:../../packages/elements-dev-portal/dist\",
\"@stoplight/elements-core\": \"file:../../packages/elements-core/dist\",
\"@stoplight/elements-utils\": \"file:../../packages/elements-utils/dist\"
}"

npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements\"]=\"file:../../packages/elements/dist\""
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements-dev-portal\"]=\"file:../../packages/elements-dev-portal/dist\""

npx json -I -f package.json -e "this.scripts.reinstall=\"rm -rf node_modules && yarn install\""
