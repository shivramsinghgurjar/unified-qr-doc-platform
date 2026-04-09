# Unified QR Management & College Event Documentation Platform

A full-stack MERN application designed to integrate QR Code Management
with automated college event documentation.

## Project Overview

Managing QR codes and official college event documentation using
separate tools leads to inefficiencies, manual work, and inconsistent
reporting.

This platform solves that problem by combining:

-   QR Code generation and management
-   QR scan tracking and analytics
-   Template-based event documentation
-   Secure user authentication
-   Role-based access control

The system allows users to create documents, generate QR codes for them,
and access those documents through QR scanning.

------------------------------------------------------------------------

## Technology Stack

### Frontend

-   React
-   Vite
-   React Router
-   CSS

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

### Authentication

-   JWT (JSON Web Token)
-   bcrypt

### Libraries

-   qrcode
-   dotenv
-   cors
-   mongoose

------------------------------------------------------------------------

## Project Architecture

Unified-QR-Management-And-College-Event-Documentation-Platform │ ├──
client (React Frontend) │ ├── src │ │ ├── components │ │ ├── pages │ │
├── services │ │ ├── styles │ │ └── assets │ ├── server (Node.js
Backend) │ ├── src │ │ ├── config │ │ ├── controllers │ │ ├── middleware
│ │ ├── models │ │ ├── routes │ │ └── server.js │ └── README.md

------------------------------------------------------------------------

## Core Features

### Authentication

-   User Registration
-   User Login
-   JWT authentication
-   Protected routes

### Role Based Access Control

Roles: - Admin - User

Admin can: - Delete documents - Manage users

User can: - Create documents - Generate QR codes - View their own data

------------------------------------------------------------------------

## QR System

Users can generate QR codes that contain links to documents or external
URLs.

Flow:

Create QR\
↓\
Store QR in database\
↓\
Generate QR Image\
↓\
Scan QR\
↓\
Scan API increments scan counter\
↓\
Redirect to original data

Each QR stores:

-   data
-   qrUrl
-   scans
-   createdBy
-   createdAt

------------------------------------------------------------------------

## Getting Started

### 1 Clone the Repository

git clone
https://github.com/YOUR_GITHUB_USERNAME/Unified-QR-Management-And-College-Event-Documentation-Platform.git

cd Unified-QR-Management-And-College-Event-Documentation-Platform

------------------------------------------------------------------------

## Backend Setup

cd server

Install dependencies:

npm install

Create a `.env` file manually inside the server folder.

Example:

PORT=5000\
MONGO_URI=mongodb://127.0.0.1:27017/unifiedqr\
JWT_SECRET=your_jwt_secret

Run backend:

npm run dev

or

node server.js

Server runs on:

https://qgen-backend-n815.onrender.com

------------------------------------------------------------------------

## Frontend Setup

Open another terminal:

cd client

Install dependencies:

npm install

Run frontend:

npm run dev

Frontend runs on:

http://localhost:5173

------------------------------------------------------------------------

## Running the Application

Start backend:

cd server\
npm run dev

Start frontend:

cd client\
npm run dev

Open browser:

http://localhost:5173

------------------------------------------------------------------------

## API Base URL

https://qgen-backend-n815.onrender.com/api

Example endpoints:

POST /api/auth/register\
POST /api/auth/login

GET /api/qr\
POST /api/qr\
GET /api/qr/scan/:id\
DELETE /api/qr/:id

GET /api/documents\
POST /api/documents\
DELETE /api/documents/:id

------------------------------------------------------------------------

## Database Collections

-   users
-   documents
-   qrs

------------------------------------------------------------------------

## Future Improvements

-   QR customization (color, logo)
-   QR download (PNG, SVG)
-   QR analytics dashboard
-   Document export (PDF / DOC)
-   Template builder
-   Admin control panel
-   QR security
-   Cloud storage integration

------------------------------------------------------------------------

## Author

Shivram Singh Gurjar\
B.Tech CSE\
Sharda University

Project developed as part of **PBL-4 Semester 6**.