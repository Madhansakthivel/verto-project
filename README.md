# Vetro-Project Backend

Inventory Management System API

---

## Project Overview

This backend project manages products, including stock management with addition and removal, using **Node.js**, **Express**, and **TypeORM** with **PostgreSQL**.  

### Features
- Add, update, and delete products  
- Increase or decrease stock quantities  
- Validation for insufficient stock  
- Fetch products below low stock threshold  
- Unit tests for stock operations  

---

## Step 1: Installation

```bash
# Clone the repository
git clone <repo_url>
cd vetro-project/backend

# Install dependencies
npm install
Step 2: Environment Variables
Create a .env file in the root directory and add the following:

env
Copy code
PORT=8081
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=vetro_db

Step 3: Scripts
Command	Description
npm start	Start the server (production build)
npm run dev	Start the server in development mode with nodemon
npm test	Run Jest unit tests
npm run build	Compile TypeScript to JavaScript

Recommended: Use npm run dev during development for automatic server reloads.

Step 4: API Documentation
Base URL
bash
Copy code
http://localhost:8081/api
Endpoints
1. Add Product
Method: POST

Endpoint: /product

Body:

json
Copy code
{
  "name": "Pen",
  "description": "Blue ink pen",
  "stock_quantity": 10,
  "low_stock_threshold": 2
}
Response:

json
Copy code
{
  "message": "Product added successfully",
  "product": {
    "product_id": "uuid",
    "product_name": "Pen",
    "product_description": "Blue ink pen",
    "stock_quantity": 10,
    "low_stock_threshold": 2,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
2. Get All Products
Method: GET

Endpoint: /product

Response:

json
Copy code
{
  "message": "Products fetched successfully",
  "products": [ /* array of products */ ]
}
3. Get Products Below Threshold
Method: GET

Endpoint: /product/threshold/:value

Params: value = threshold number

Response:

json
Copy code
{
  "message": "Products below threshold fetched successfully",
  "products": [ /* array of products */ ]
}
4. Update Product
Method: PATCH

Endpoint: /product/:id

Body:

json
Copy code
{
  "name": "Pen",
  "description": "Black ink pen",
  "stock_quantity": 15,
  "low_stock_threshold": 3
}
Response:

json
Copy code
{
  "message": "Product updated successfully",
  "product": { /* updated product object */ }
}
5. Increase Stock Quantity
Method: PATCH

Endpoint: /product/:id/increase-quantity

Body:

json
Copy code
{
  "amount": 5
}
Response:

json
Copy code
{
  "message": "Stock quantity increased successfully",
  "product": { /* updated product object */ }
}
6. Decrease Stock Quantity
Method: PATCH

Endpoint: /product/:id/decrease-quantity

Body:

json
Copy code
{
  "amount": 3
}
Response:

json
Copy code
{
  "message": "Stock quantity decreased successfully",
  "product": { /* updated product object */ }
}
Error Response (insufficient stock):

json
Copy code
{
  "message": "Stock quantity is insufficient"
}
7. Delete Product
Method: DELETE

Endpoint: /product/:id

Response:

json
Copy code
{
  "message": "Product deleted successfully"
}
Step 5: Running Unit Tests
Unit tests cover stock addition and removal logic, including edge cases like trying to remove more stock than available.

bash
Copy code
npm test
Tests include:

Increasing stock

Decreasing stock

Prevent decreasing below zero

Handling negative stock changes

Notes
Make sure the PostgreSQL database exists before starting the server.

TypeORM synchronize: true can automatically create tables during development. For production, use migrations.

All endpoints return JSON responses with proper status codes.

