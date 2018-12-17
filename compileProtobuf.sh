#!/bin/sh

protoc -I=./protobuf --go_out=./backend/pb ./protobuf/*.proto