#!/usr/bin/env bash
if yarn lerna changed
then
  yarn lerna publish --yes --registry https://registry.npmjs.org
else
  echo "No changes, skipping publish"
fi
