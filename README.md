# verto-project Backend
Inventory Management System API

Project Overview

This backend project manages products, including stock management with addition and removal, using Node.js, Express, and TypeORM with PostgreSQL.

Step - 1: Installation
# Clone the repository
git clone <repo_url>

# Install dependencies
npm install




Step - 2: Environment Variables
Create a .env file in the root directory and add the following:
PORT=8081
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=vetro_db


Step -3: Scripts
npm start - Start the server (production build)
npm run dev - Start the server in development mode with nodemon
npm test - Run Jest test suite
npm run build - Compile TypeScript to JavaScript

#use nodemon among the above to start
npm run dev - Start the server in development mode with nodemon

# To test the unit test cases use below command
npm test - Run Jest test suite



