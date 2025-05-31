# Image Project

## Description
This project is an image processing service built with Node.js and Express. It allows uploading images and resizing them.

## Installation
Run the following command to install dependencies:
```
npm install
```

## Running the Application
To start the server, run:
```
npm start
```
The server listens on port 3000.

## API Endpoints

### POST /upload
Uploads an image file.

- **Request:** Multipart/form-data with a single file field named `image`.
- **Response:**
  - `200 OK` - File uploaded successfully.
  - `400 Bad Request` - No files were uploaded.

Example using curl:
```
curl -X POST -F "image=@path_to_your_image.jpg" http://localhost:3000/upload
```

## Running Tests
To run all tests (Jasmine and SuperTest), use:
```
npm test

### GET /
Serves static files from the project root directory.

- **Request:** GET request to the root URL.
- **Response:** Serves static files such as index.html with status 200.