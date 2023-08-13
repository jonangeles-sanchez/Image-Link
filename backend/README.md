# ImageLink API

## Introduction

ImageLink is a platform designed for hosting and sharing images with friends and family across any device, making it easy to manage and enjoy your photo collections. Users can create accounts to organize, store, and share their images, and even provide others with access to their curated image collections via ImageLinks. An ImageLink is a URL or a unique code that allows anyone to view the shared image collection.

### Key Features

- Create and manage image collections
- Share image collections using ImageLinks
- Secure and reliable storage of images
- Easy access to image collections from any device
- Simple and intuitive user interface

## Getting started

The ImageLink API allows applications to interact with ImageLink's servers to manage image collections and obtain images. The API is designed around REST principles and uses JSON-encoded responses.

## Errors

The ImageLink API uses standard HTTP response codes to indicate the outcome of API requests. Here's what the response codes mean:

- Codes in the 2xx range indicate success.
- Codes in the 4xx range indicate client errors (e.g., missing parameters, unauthorized requests).
- Codes in the 5xx range indicate server errors (rare).

## Endpoints

### User

#### POST /api/user/

Create a new user. Returns a user object and a token.

**Request:**

```json
{
  "username": "username",
  "password": "password",
  "email": "email"
}
```

#### POST /api/user/login/

Login a user. Returns a user object and a token.

**Request:**

```json
{
  "username": "username",
  "password": "password"
}
```

### Image Collection (ImageLink)

#### POST /api/imagelinks/

Create a new image collection. Returns the newly created image collection object.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

**Request:**

```json
{
  "user": "user_id",
  "title": "image_title",
  "description": "image_description"
}
```

#### GET /api/imagelinks/

Get all image collections associated with the user. Returns an array of image collection objects.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

#### GET /api/imagelinks/:imagelinkid

Get a single image collection by ID. Returns the image collection object.

**URL Parameters:**

- `imagelinkid`: The ID of the image collection.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

#### PUT /api/imagelinks/:imagelinkid

Update a single image collection by ID. Returns the updated image collection object.

**URL Parameters:**

- `imagelinkid`: The ID of the image collection.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

**Request:**

```json
{
  "title": "new_image_title",
  "description": "new_image_description"
}
```

#### DELETE /api/imagelinks/:imagelinkid

Delete a single image collection by ID. Returns a success message.

**URL Parameters:**

- `imagelinkid`: The ID of the image collection.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

#### POST /api/:imagelinkid/:imageid

Obtain an image from the specified image collection by image ID. Returns the image.

**URL Parameters:**

- `imagelinkid`: The ID of the image collection.
- `imageid`: The ID of the image.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

#### DELETE /api/imagelinks/:imageid

Delete an image from the specified image collection by image ID. Returns a success message.

**URL Parameters:**

- `imagelinkid`: The ID of the image collection.
- `imageid`: The ID of the image.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

### ImageLink Code

#### GET /api/code/:code

Get an ImageLink code by code. Returns the associated image collection ID.

**URL Parameters:**

- `code`: The code for the ImageLink.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

#### POST /api/code/:imagelinkid

Create a new ImageLink code for the specified image collection ID. Returns the newly created ImageLink code.

**URL Parameters:**

- `imagelinkid`: The ID of the image collection.

**Authorization Header:**

```makefile

Authorization: Bearer <your_token>
```

**Request:**

```json
{
  "imagelinkid": "imagelink_id"
}
```

## Authentication and Authorization

Authentication and authorization are essential components of the ImageLink API, ensuring that only authorized users can access certain endpoints and perform specific actions. This API uses JSON Web Tokens (JWT) to provide secure and reliable authorization for protected routes.

### Authentication

To access protected endpoints in the ImageLink API, clients must include a valid JWT in the `Authorization` header of their HTTP requests. The authentication process is handled by the `protect` middleware, which verifies the validity of the token and extracts user information from it.

The authentication code is implemented within `backend/middleware/auth.js`. It is used to protect routes that require authentication and ensure that only valid users with a valid token can access them.

#### Example: Protecting an Endpoint

The following code snippet demonstrates how the `protect` middleware is used to protect an endpoint in the ImageLink API:

```javascript
// Import the protect middleware
const { protect } = require("../middleware/auth");

// Define a protected route
router.get("/protected-resource", protect, (req, res) => {
  res.json({ message: "This is a protected resource" });
});
```

### Authorization

Authorization in the ImageLink API ensures that users can only access the resources and perform actions that they are authorized to. The specific permissions and roles required for each endpoint are documented in the endpoint descriptions.

#### Error Handling

If a request lacks a valid token or the provided token is invalid, the API will respond with a 401 Unauthorized status code. It's important to handle these cases gracefully on the client side.

Remember to apply the `protect` middleware to any route that requires authentication and/or authorization in your ImageLink API.
