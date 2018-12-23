#!/bin/sh

protoc -I=./protobuf --go_out=./backend/pb ./protobuf/*.proto

./ui/node_modules/protobufjs/bin/pbjs -t static-module -w commonjs \
    -o ./ui/src/pb/typingwars.pb.js \
    ./protobuf/typingwars.proto