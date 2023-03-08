FROM node:19-alpine AS build
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html