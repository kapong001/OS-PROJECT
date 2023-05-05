FROM node:16
WORKDIR /app
LABEL VERSION=0.1 
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]