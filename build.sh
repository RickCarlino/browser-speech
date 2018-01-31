#!/bin/bash

# Recompile
rm -rf dist
mkdir dist
node_modules/typescript/bin/tsc
echo "DONE"