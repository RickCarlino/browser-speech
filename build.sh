#!/bin/bash

# Recompile
rm -rf build
mkdir -p dist
node_modules/typescript/bin/tsc
echo "DONE"