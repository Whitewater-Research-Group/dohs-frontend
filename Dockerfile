# Use the official Node.js image.
FROM node:18

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install app dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose port 3000 (default port for Express apps).
EXPOSE 3001

# Command to run the application.
CMD ["npm", "start"]
