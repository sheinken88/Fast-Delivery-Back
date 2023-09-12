FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Set the MongoDB connection string as an environment variable
# ENV MONGO_URI=mongodb://mongo_host:27017/db_name

CMD [ "npm", "start" ]

# ID:f381f32062696cd1d7e53f140d51e1e3b453ef849fe8d7795df95985a5fd1e5f