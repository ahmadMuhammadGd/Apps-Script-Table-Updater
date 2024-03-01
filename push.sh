#!/bin/bash

read -p "Enter the ID: " id
clasp clone "$id" --rootDir src

echo "Do you want to push code to the cloud? (Press Enter to continue, 'ctrl + c' to cancel)"
read -n 1 -s
clasp -P src/ push
