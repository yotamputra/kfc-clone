# Restaurant App API Documentation

## Endpoints :

List of available endpoints:

Pub
- `GET /pub`
- `GET /pub/categories`
- `GET /pub/:id`

Users
- `POST /add-user`
- `POST /login`

Cuisines
- `GET /cuisines`
- `POST /cuisines`
- `GET /cuisines/:id`
- `PUT /cuisines/:id`
- `DELETE /cuisines/:id`
- `PATCH /cuisines/:id`

Categories
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`

&nbsp;

## 1. GET /pub
Description:
- Get all data cuisine from database

Request:

- PARAMS:
  - filter
  - sort
  - page[size]
  - page[number]

_Response (200 - OK)_

```json
{
    "page": "integer",
    "data": [
        {
            "id": "integer",
            "name": "string",
            "description": "string",
            "price": "integer",
            "imgUrl": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "categoryId": "integer",
            "authorId": "integer"
        },
        ...
    ],
    "totalData": "integer",
    "totalPage": "integer",
    "dataPerPage": "integer"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 2. GET /pub/categories
Description:
- Get all data categories from database

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 3. GET /pub/:id
Description:
- Get all data cuisines from database by id

Request:

- params: 2 ( Id )

_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "categoryId": "integer",
    "authorId": "integer"
}
```

_Response (404 - Error Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 4. POST /add-user

Description:
- Add user by Admin

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "username": "string"
}
```

_Response (201 - Created)_

```json
{
  "email": "string",
  "phoneNumber": "string",
  "address": "string",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Phone Number is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
```

&nbsp;

## 5. GET /cuisines
Description:
- Get all data cuisines from database

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "string",
        "createdAt": "date",
        "updatedAt": "date",
        "categoryId": "integer",
        "authorId": "integer",
        "User": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    },
    ...
]
```

&nbsp;

## 6. POST /cuisines
Description:
- Add / Create data cuisines to database

Request:

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "string",
  "imgUrl": "string",
  "categoryId": "string"
}
```
_Response (201 - Created)_

```json
{
    "createdAt": "date",
    "updatedAt": "date",
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Image Url is required"
}
OR
{
  "message": "Category Id is required"
}

```

&nbsp;



## 7. GET /cuisines/:id
Description:
- Get data cuisine from database by id

Request:
- params : id
- body:

```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "username": "string"
}
```
_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "categoryId": "integer",
  "authorId": "integer"
}

```
_Response (404 - Not Found)_

```json
{
    "message": "Error not found"
}

```

&nbsp;


## 8. PUT /cuisines/:id
Description:
- Edit data cuisine from database by id

Request:
- params : id
- body:

```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "username": "string"
}
```
_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "categoryId": "integer",
  "authorId": "integer"
}

```
_Response (404 - Not Found)_

```json
{
    "message": "Error not found"
}

```
_Response (403 - Forbidden)_

```json
{
    "message": "You don't have access"
}

```

&nbsp;

## 9. DELETE /cuisines/:id
Description:
- Delete data cuisine from database by id

Request:
- params : id

_Response (200 - OK)_

```json
{
  "message": "<Cuisine name> deleted successfully"
}

```
_Response (404 - Not Found)_

```json
{
    "message": "Error not found"
}

```
_Response (403 - Forbidden)_

```json
{
    "message": "You don't have access"
}

```

&nbsp;


## 10. PATCH /cuisines/:id
Description:
- Edit data cuisine from database by id

Request:
- params : id
- body : `<image file>`

_Response (200 - OK)_

```json
{
  "message": "Image <Cuisine name> success to update"
}

```
_Response (404 - Not Found)_

```json
{
    "message": "Error not found"
}

```
_Response (403 - Forbidden)_

```json
{
    "message": "You don't have access"
}

```

&nbsp;

## 11. GET /categories
Description:
- Get all data categories from database

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...
]
```

&nbsp;


## 12. POST /categories
Description:
- Add data category to database

Request:
- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "string",
    "updatedAt": "date",
    "createdAt": "date"
}
```

&nbsp;

## 13. PUT /categories/:id
Description:
- Edit data category from database by id

Request:
- params : id
- body:

```json
{
  "name": "string"
}
```
_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "string",
    "updatedAt": "date",
    "createdAt": "date"
}

```
_Response (404 - Not Found)_

```json
{
    "message": "Error not found"
}

```
_Response (403 - Forbidden)_

```json
{
    "message": "You don't have access"
}

```

&nbsp;



## GLOBAL ERROR
_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal Server Error"
}
```