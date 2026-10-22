#!/bin/bash
# Runs the e2e tests against published versions of Elements instead of the local build, to check that the local
# build behaves the same way. Usage:
#
#   scripts/e2e-baseline.sh <example> [elements-version] [elements-dev-portal-version] [playwright args...]
#
# The example is built from `examples/<example>`, in `examples-dev/<example>`, like `npm run copy:<example>` does,
# but with the packages installed from npm. `BASELINE=1` is set, so tests that only make sense for the local build
# (they are marked in the test files) are skipped.
set -euo pipefail

example=${1:?usage: e2e-baseline.sh <example> [elements-version] [elements-dev-portal-version] [playwright args...]}
elements=${2:-9.0.29}
devPortal=${3:-3.0.29}
shift $(( $# < 3 ? $# : 3 ))

rm -rf "examples-dev/$example"
mkdir -p examples-dev
cp -a "examples/$example" examples-dev

cd "examples-dev/$example"
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements\"]=\"$elements\""
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements-dev-portal\"]=\"$devPortal\""
# Elements 9 depends on packages that only allow React up to 18 as a peer. With React 19, npm answers that by
# installing a separate copy of them (react-query, for one) for every package that needs them, and the copies don't
# share their context. Skipping peer dependency resolution, like apps that use Elements 9 with React 19 have to, avoids that.
echo "legacy-peer-deps=true" > .npmrc
rm -rf node_modules package-lock.json
npm install
npm run build
cd ../..

BASELINE=1 EXAMPLE="$example" npx playwright test "$@"
