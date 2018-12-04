#!/bin/sh

protoc -I=./protobuf --go_out=./pb ./protobuf/*.proto