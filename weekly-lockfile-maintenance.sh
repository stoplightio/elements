#!/bin/bash

# Question: Why does this script exist? Why not use dependabot?
# Answer: https://11sigma.com/blog/2021/09/03/yarn-lock-how-it-works-and-what-you-risk-without-maintaining-yarn-dependencies-deep-dive/

# https://stackoverflow.com/questions/3822621/how-to-exit-if-a-command-failed/19469570#19469570
set -e 
set -o pipefail

# https://circleci.com/docs/2.0/using-shell-scripts/#set-error-flags
set -o nounset
set -o errexit

git checkout main
git pull --ff-only

BRANCH_NAME=feat/lockfile-maintenance-ci-job-$(date +"%m-%d-%Y")
git checkout -b "$BRANCH_NAME"

yarn upgrade

git add yarn.lock
git commit -m "chore: weekly lockfile maintenance"
git push --set-upstream origin "$BRANCH_NAME"

BODY='{"head":''"'${BRANCH_NAME}'"'',"base":"main","title":"Weekly lockfile maintenance"}'

curl -X POST -H "Accept:application/vnd.github.v3+json" -u "$GIT_AUTHOR_NAME":"$GH_TOKEN" https://api.github.com/repos/stoplightio/elements/pulls -d "$BODY"