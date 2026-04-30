# 🍷 LiquorWeb

LiquorWeb is a **MERN stack web application built using microservices architecture** that allows users to explore liquor based on flavor preferences, locate nearby stores, and place orders efficiently.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 🍹 Browse liquor by flavor (sweet, bitter, strong, etc.)
* 📍 Find nearby liquor stores
* 🛒 Place and manage orders
* ⚡ Scalable microservices architecture
* 🐳 Dockerized environment for easy setup

---

## 🏗️ Architecture

This project follows a **Microservices Architecture**:

* API Gateway (Single entry point)
* Auth Service (User management)
* Product Service (Liquor data)
* Order Service (Order processing)
* Location Service (Nearby store detection)

Each service:

* Runs independently
* Has its own database
* Communicates via REST APIs

---

## 🧰 Tech Stack

### Frontend

* React.js
* Axios
* CSS / Tailwind (optional)

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### DevOps & Tools

* Docker & Docker Compose
* Git & GitHub
* Postman (API testing)

---

## 📁 Project Structure

```
liquorweb/
│
├── gateway/
├── services/
│   ├── auth-service/
│   ├── product-service/
│   ├── order-service/
│   └── location-service/
│
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/liquorweb.git
cd liquorweb
```

### 2️⃣ Setup Environment Variables

Create `.env` files for each service:

Example:

```
PORT=5001
MONGO_URI=mongodb://mongo:27017/auth-db
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Run with Docker

```
docker-compose up --build
```

---

### 4️⃣ Access the Application

* Frontend: http://localhost:3000
* API Gateway: http://localhost:5000

---

## 🔌 API Endpoints (Example)

### Auth Service

* POST `/api/auth/register`
* POST `/api/auth/login`

### Product Service

* GET `/api/products`
* GET `/api/products/:id`

### Order Service

* POST `/api/orders`
* GET `/api/orders/:userId`

---

## 🧭 Development Roadmap

* ✅ Phase 1: Authentication & Product Service
* 🔄 Phase 2: Order Management
* ⏳ Phase 3: Location-based Services
* 🚀 Phase 4: UI Improvements & Deployment

---

## ⚠️ Legal Considerations

This project involves liquor-related services. Ensure compliance with local laws and regulations regarding:

* Age restrictions
* Alcohol sales and delivery
* Location-based permissions

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by Ramesh Krishan
GitHub: https://github.com/ramesh-2003-krishan

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
