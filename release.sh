#!/usr/bin/env bash
if yarn lerna changed
then
  yarn lerna publish --yes 
else
  echo "No changes, skipping publish"
fi
