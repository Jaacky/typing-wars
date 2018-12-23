FROM node:8 AS ui-builder

WORKDIR /home/node/app
COPY ui ./ui

WORKDIR /home/node/app/ui
RUN yarn install && yarn build

############################
# STEP 1 build executable binary
############################
FROM golang:alpine AS builder

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git curl

# Install go dep
# RUN curl -fsSL -o /usr/local/bin/dep https://github.com/golang/dep/releases/download/vX.X.X/dep-linux-amd64 && chmod +x /usr/local/bin/dep

RUN curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh

WORKDIR $GOPATH/src/github.com/Jaacky/typingwars/

# Copy neccessary files
COPY backend ./backend
COPY Gopkg.toml Gopkg.lock main.go ./
COPY --from=ui-builder /home/node/app/ui/dist ./ui/dist

# install the dependencies without checking for go code
RUN dep ensure -vendor-only
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/typingwars

############################
# STEP 2 build a small image
############################
FROM scratch
# Copy our static executable.
COPY --from=builder /go/bin/typingwars /go/bin/typingwars
# Run the hello binary.
EXPOSE 8080
ENTRYPOINT ["/go/bin/typingwars"]