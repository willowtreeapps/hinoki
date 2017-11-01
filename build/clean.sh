#!/bin/bash

cwd=$(pwd)

while IFS='' read -r line || [[ -n "$line" ]]; do
    path="${cwd}/$line"
    echo -n "Cleaning ${path}..."
    rm -rf "${path}/node_modules" "${path}/package-lock.json"
    echo "done"
done < "${cwd}/build/paths"