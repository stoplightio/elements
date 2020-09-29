#!/usr/bin/env bash
if yarn lerna changed
then
  if [[ $CIRCLE_BRANCH == "master" ]]
  then
    yarn lerna publish --conventional-commits --force-publish=@stoplight/elements,@stoplight/elements-web-components --yes --dist-tag latest
  elif [[ $CIRCLE_BRANCH == "beta" ]]
  then
    yarn lerna publish --conventional-commits --force-publish=@stoplight/elements,@stoplight/elements-web-components --yes --dist-tag beta --preid beta
  else
    yarn lerna publish --conventional-commits --force-publish=@stoplight/elements,@stoplight/elements-web-components --yes --dist-tag alpha --preid alpha
  fi
else
  echo "No changes, skipping publish"
fi
