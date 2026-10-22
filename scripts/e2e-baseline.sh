#!/bin/bash
# Runs the e2e tests against published versions of Elements instead of the local build, to check that the local
# build behaves the same way. Usage:
#
#   [REACT=18] scripts/e2e-baseline.sh <example> [elements-version] [elements-dev-portal-version] [playwright args...]
#
# The versions default to the newest releases of Elements 9 and the dev portal 3 on npm. A version that is left empty
# gets the default as well.
#
# Elements 9 was made for React 18 and runs with React 19 only with workarounds, so the check has two forms: the
# default one (React 19, the example as it is) and `REACT=18`, which runs the react-vite example on React 18 with
# React Router 6, which is how Elements 9 is meant to be used. The other examples don't use React themselves.
#
# The example is built from `examples/<example>`, in `examples-dev/<example>`, like `npm run copy:<example>` does,
# but with the packages installed from npm. `BASELINE=1` is set, so tests that only make sense for the local build
# (they are marked in the test files) are skipped.
set -euo pipefail

example=${1:?usage: e2e-baseline.sh <example> [elements-version] [elements-dev-portal-version] [playwright args...]}
elements=${2:-$(node scripts/published-version.mjs @stoplight/elements 9)}
devPortal=${3:-$(node scripts/published-version.mjs @stoplight/elements-dev-portal 3)}
react=${REACT:-19}
shift $(( $# < 3 ? $# : 3 ))

rm -rf "examples-dev/$example"
mkdir -p examples-dev
cp -a "examples/$example" examples-dev

cd "examples-dev/$example"
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements\"]=\"$elements\""
npx json -I -f package.json -e "this.dependencies[\"@stoplight/elements-dev-portal\"]=\"$devPortal\""
if [ "$react" = "18" ]; then
  [ "$example" = "react-vite" ] || { echo "REACT=18 only applies to the react-vite example" >&2; exit 2; }
  npx json -I -f package.json -e '
    this.dependencies.react = "^18.3.1";
    this.dependencies["react-dom"] = "^18.3.1";
    this.devDependencies["@types/react"] = "^18.3.0";
    this.devDependencies["@types/react-dom"] = "^18.3.0";
    delete this.dependencies["react-router"];
    this.dependencies["react-router-dom"] = "^6.30.0";
    delete this.overrides;
  '
  sed -i.bak "s#from 'react-router'#from 'react-router-dom'#" src/App.tsx src/components/*.tsx
  find src -name '*.bak' -delete
else
  # Elements 9 depends on packages that only allow React up to 18 as a peer. With React 19, npm answers that by
  # installing a separate copy of them (react-query, for one) for every package that needs them, and the copies don't
  # share their context. Skipping peer dependency resolution, like apps that use Elements 9 with React 19 have to, avoids that.
  echo "legacy-peer-deps=true" > .npmrc
fi
rm -rf node_modules package-lock.json
npm install
npm run build
cd ../..

BASELINE=1 EXAMPLE="$example" npx playwright test "$@"
