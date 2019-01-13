# Let Docker cache go modules
FROM golang:alpine AS base_builder

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git curl

WORKDIR $GOPATH/src/github.com/Jaacky/typingwars/

# Copy neccessary files
COPY backend ./backend
COPY go.mod go.sum main.go ./

ENV GO111MODULE=on
RUN go mod download

# Build executable binary
FROM base_builder AS binary_builder

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/typingwars

# Build small image
FROM scratch

# Copy our static executable
COPY --from=binary_builder /go/bin/typingwars /go/bin/typingwars
COPY backend/wordgenerator/eff_large_wordlist.txt /wordgenerator/eff_large_wordlist.txt

# Run the hello binary.
EXPOSE 80
ENTRYPOINT ["/go/bin/typingwars"]