#!/usr/bin/env bash
if yarn lerna changed
then
  yarn lerna publish --conventional-commits --force-publish=@stoplight/elements,@stoplight/elements-web-components --yes --dist-tag latest
else
  echo "No changes, skipping publish"
fi
