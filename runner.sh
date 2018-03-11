#!/bin/bash
for file in $1/*.json
do
echo "import { normalize, schema } from 'normalizr';\n"
babel-node ./loopbackToNormalizr.js $file
done
