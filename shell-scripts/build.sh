#!/bin/bash

cwd=$(pwd)

while IFS='' read -r line || [[ -n "$line" ]]; do
    path="${cwd}/$line"
    echo -e "\r\n===== Starting build of ${path} ====="
    cd $path
    npm install && tsc -p ./
    echo -e "===== Completed build of ${path} =====\r\n"
done < "${cwd}/paths"