FROM node:16

RUN npm install -g @google/clasp

WORKDIR /app

COPY . .

EXPOSE 8080

LABEL version="1.0"
LABEL description="Node.js application with @google/clasp installed"