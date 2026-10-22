#!/bin/bash
# Checks that the local build of Elements looks the same as a published version: records screenshots of pages
# from the published version, then runs the same pages against the local build and compares them.
#
#   scripts/visual-compat.sh <example> [elements-version] [elements-dev-portal-version]
#
# Needs a local build (`npm run build`). Differences end up in `e2e-results/artifacts`, as an image of the
# expected page, the actual page and the difference between them.
set -euo pipefail

example=${1:?usage: visual-compat.sh <example> [elements-version] [elements-dev-portal-version]}
elements=${2:-9.0.29}
devPortal=${3:-3.0.29}

rm -rf e2e-visual-baseline

echo "==> Recording screenshots from published Elements $elements"
VISUAL=1 scripts/e2e-baseline.sh "$example" "$elements" "$devPortal" visual --update-snapshots

echo "==> Comparing the local build with them"
rm -rf "examples-dev/$example"
npm run "copy:$example"
npm run "build:$example"
VISUAL=1 EXAMPLE="$example" npx playwright test visual
