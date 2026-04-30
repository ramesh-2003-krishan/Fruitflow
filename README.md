# 🍎 FruitFlow

### *Fresh • Smart • Delivered*

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Stack](https://img.shields.io/badge/stack-MERN-blue)
![Architecture](https://img.shields.io/badge/architecture-microservices-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🌐 Overview

**FruitFlow** is a full-stack web application built using the **MERN stack with Microservices Architecture**.
It enables users to explore fresh fruits, filter by taste and category, locate nearby vendors, and place orders seamlessly.

This project is designed to demonstrate **real-world system design, scalability, and clean architecture principles**.

---

## 🚀 Key Features

### 👤 User Features

* 🔐 Secure authentication (JWT-based)
* 🍊 Browse fruits by category (tropical, citrus, etc.)
* 🍓 Filter by taste (sweet, sour, juicy)
* 🛒 Add to cart & place orders
* 📦 Track order status
* 📍 Find nearby vendors

---

### 🛍️ Vendor Features (Optional Extension)

* ➕ Add & manage products
* 📊 Manage inventory
* 📥 Accept or reject orders

---

## 🧠 System Architecture

```txt id="e9l4s6"
Client (React)
     │
     ▼
API Gateway (Node.js)
     │
 ┌──────────────────────────────┐
 │ Auth Service                 │
 │ Product Service              │
 │ Order Service                │
 │ Location Service             │
 │ Payment Service (Optional)   │
 └──────────────────────────────┘
     │
     ▼
MongoDB Databases (per service)
```

---

## 🧰 Tech Stack

### 🖥️ Frontend

* React.js
* Axios
* Tailwind CSS (optional)

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB

### 🐳 DevOps & Tools

* Docker & Docker Compose
* Git & GitHub
* Postman (API testing)

---

## 📁 Project Structure

```bash id="yx7mb0"
fruitflow/
│
├── gateway/
├── services/
│   ├── auth-service/
│   ├── product-service/
│   ├── order-service/
│   ├── location-service/
│   └── payment-service/
│
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Getting Started

### 📥 Clone the Repository

```bash id="x2l0z3"
git clone https://github.com/your-username/fruitflow.git
cd fruitflow
```

---

### 🔧 Environment Setup

Create `.env` files for each service.

Example:

```env id="mtb5jh"
PORT=5001
MONGO_URI=mongodb://mongo:27017/auth-db
JWT_SECRET=your_secret_key
```

---

### 🐳 Run with Docker

```bash id="gznl8r"
docker-compose up --build
```

---

### 🌍 Access the App

* Frontend → http://localhost:3000
* API Gateway → http://localhost:5000

---

## 🔌 API Endpoints (Sample)

### Auth Service

```http id="ywqzvm"
POST /api/auth/register
POST /api/auth/login
```

### Product Service

```http id="6l21db"
GET /api/products
GET /api/products/:id
```

### Order Service

```http id="m3yx9m"
POST /api/orders
GET /api/orders/:userId
```

---

## 🗺️ Roadmap

* [x] Project Setup
* [x] Auth Service
* [ ] Product Service
* [ ] Order Service
* [ ] Location Service
* [ ] Payment Integration
* [ ] Frontend UI
* [ ] Deployment

---

## 💡 Future Enhancements

* 🤖 AI-based fruit recommendations
* 📊 Analytics dashboard
* 🚚 Real-time delivery tracking
* ⭐ Ratings & reviews

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ramesh Krishan**
🔗 https://github.com/ramesh-2003-krishan

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

