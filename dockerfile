FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Set the MongoDB connection string as an environment variable
# ENV MONGO_URI=mongodb://mongo_host:27017/db_name

CMD [ "npm", "start" ]

