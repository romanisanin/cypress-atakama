#!/bin/bash
set -e
npm install cypress
S3URL="s3://atakama-test-output/website-$(date '+%Y-%m-%d-%H-%M-%S')/"
DISPLAY=:100 $(npm bin)/cypress run
aws s3 cp cypress/videos/* $S3URL || true
aws s3 cp cypress/screenshots/* $S3URL || true
