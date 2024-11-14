# Base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port for the React app
EXPOSE 5173

# Run the React app
CMD ["npm", "run", "dev"]