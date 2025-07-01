# Movie Store Web Application

An integrated full-stack web application that simplifies the process of **purchasing** and **reviewing** movies online. The system provides a seamless and modern user experience by combining an interactive front-end with a powerful, modular back-end architecture.

---

## Features

### User Management

* Create, edit, and delete user accounts.
* View account-specific cart and order history.

### Movie Management

* Add, edit, and delete movies.
* View movies by type or category.

### Ratings System

* Users can rate and review movies.
* Edit or delete ratings dynamically.

### Shopping Cart

* Add movies to a user’s cart.
* View and delete cart items.
* Process transactions and manage order history.

### Movie Types

* Create and manage movie categories.
* Filter movies by type.

---

## Technologies Used

| Layer                | Tech Stack  |
| -------------------- | ----------- |
| **Frontend**         | Angular 17  |
| **Backend**          | Spring Boot |
| **Database**         | MySQL       |
| **Containerization** | Docker      |

---

## Deployment with Docker

### MySQL Setup

```bash
docker pull mysql
docker network create springboot-mysql-net
```

Run the MySQL container with appropriate env variables and volume settings.

### Spring Boot Backend

* Built using Maven.
* Docker image creation:

```bash
docker build -t springbootmysql .
```

* Run the container and attach it to the network created earlier.

### Angular Frontend

* Build Angular project:

```bash
ng build
```

* Use Docker to serve via Nginx:

```Dockerfile
FROM node:latest as node
WORKDIR /
FROM nginx:alpine
COPY ./dist/movie-app/browser /usr/share/nginx/html
```

---

## API Endpoints

### Movies

* `GET /api/movies`
* `POST /api/movies`
* `PUT /api/movies/{id}`
* `DELETE /api/movies/{id}`

### Ratings

* `GET /api/ratings`
* `POST /api/ratings`
* `PUT /api/ratings/{id}`
* `DELETE /api/ratings/{id}`

### Types

* `GET /api/types`
* `POST /api/types`
* `PUT /api/types/{id}`
* `DELETE /api/types/{id}`

### Accounts

* `GET /api/accounts`
* `POST /api/accounts`
* `PUT /api/accounts/{id}`
* `DELETE /api/accounts/{id}`

### Cart Items

* `GET /api/cartitems`
* `POST /api/cartitems`
* `DELETE /api/cartitems/{id}`

---

## Screenshots

* List Movies



  <img width="359" alt="image" src="https://github.com/user-attachments/assets/48a3a59c-f68e-4155-afb0-8956c10d9d4f" />
  
* List of Ratings



  <img width="431" alt="image" src="https://github.com/user-attachments/assets/74c6e062-d5be-418a-af1a-631457bbddab" />

* Add Rating



  <img width="434" alt="image" src="https://github.com/user-attachments/assets/ea8c3ce7-a936-49e0-87e2-aa49f9588895" />

* Edit Rating



  <img width="403" alt="image" src="https://github.com/user-attachments/assets/3b30c220-639a-4356-ae49-fd2647e6f3f6" />

* User Account Management



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/40438ca4-3a38-4a4f-a00b-8403e5283bf3" />

* View Cart



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/5bc0e619-7dab-4471-8716-7553cebbc649" />

* Docker (MySQL Setup)
  First we pulled mysql using :
  docker pull mysql

  then we created a network using:
  docker network create springboot-mysql-net




  <img width="318" alt="image" src="https://github.com/user-attachments/assets/b587c587-66bf-497e-a126-9aaaeeb26ebf" />

  Run MySQL container:



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/3789e146-f3a6-4dec-bb71-964cc8f3bb34" />

  Verify:



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/ad3c923c-240b-45ff-80ce-002c7a273a23" />





  <img width="206" alt="image" src="https://github.com/user-attachments/assets/769a3a1d-1172-4533-b83f-0357f7635f9f" />

* Docker (Spring Boot Setup)
  application.properties after running maven build:



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/807ff5f6-201f-4281-8404-e7a8b85d59cc" />

  Build Docker image:
  docker build -t springbootmysql .



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/d9847448-ffdf-4ccc-ae6e-b1eba1276bb0" />

  Run container:



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/3bcc05ce-f85a-4089-9a62-fa11623212ff" />

  Check logs:



  <img width="434" alt="image" src="https://github.com/user-attachments/assets/00cdfd19-d89a-479d-b49e-3e6464a6157b" />

  Verifying:



  <img width="218" alt="image" src="https://github.com/user-attachments/assets/aab20c1c-75f7-4c4f-85fb-6eae1584ac01" />
* Docker (Angular Setup)



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/a3b13d32-fdff-4205-817c-f3bcf5b19e84" />

  Build & run:



  <img width="467" alt="image" src="https://github.com/user-attachments/assets/d89a6794-f51d-4783-b9c5-12fe9e43c17a" />





  <img width="467" alt="image" src="https://github.com/user-attachments/assets/b6fc083c-a532-40b7-805a-3b9c475dbd21" />




  <img width="467" alt="image" src="https://github.com/user-attachments/assets/5ce3a68b-2659-414d-a4c7-4b7579d39e65" />

---

## Authors

* Aaesha Rashed Alshehhi
* CIA 4133 - Advanced Application Development - Group Project (2025)

---

## License

This project is for academic purposes only.
