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

WORKDIR $GOPATH/src/github.com/Jaacky/typingwars/

# Copy neccessary files
COPY backend ./backend
COPY go.mod go.sum main.go ./
COPY --from=ui-builder /home/node/app/ui/dist ./ui/dist

# install the dependencies without checking for go code
RUN go get -u github.com/gobuffalo/packr/v2/packr2
RUN packr2
ENV GO111MODULE=on
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/typingwars

############################
# STEP 2 build a small image
############################
FROM scratch
# Copy our static executable.
COPY --from=builder /go/bin/typingwars /go/bin/typingwars
COPY backend/wordgenerator/eff_large_wordlist.txt /wordgenerator/eff_large_wordlist.txt

# Run the hello binary.
EXPOSE 8080
ENTRYPOINT ["/go/bin/typingwars"]