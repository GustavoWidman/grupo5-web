#develop stage
FROM node:alpine AS develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#build stage
FROM develop-stage as build-stage
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY deploy/nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]