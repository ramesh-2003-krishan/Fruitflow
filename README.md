# 🍎 FruitFlow - Fresh Fruit E-Commerce Platform

### *Fresh • Organic • Delivered Daily*

![Status](https://img.shields.io/badge/status-live-green)
![Stack](https://img.shields.io/badge/stack-MERN-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🌐 Overview

**FruitFlow** is a full-stack e-commerce web application built with the **MERN stack** (MongoDB, Express, React, Node.js). It's Sri Lanka's organic fruit delivery platform connecting local farmers with health-conscious consumers.

Users can browse fresh fruits, find nearby shops, place orders, track delivery, and leave reviews—all with a seamless, modern interface.

---

## ✨ Key Features

### 🎬 User Experience
* ✅ **Animated Intro Splash Screen** - Dynamic apple throw animation with letter reveal
* ✅ **Responsive Mobile-First Design** - Works on all devices
* ✅ **Professional UI** - Green theme with Tailwind CSS styling

### 🔐 Authentication & User Management
* ✅ **Secure JWT-based Authentication**
* ✅ **Login/Signup Pages** - Easy registration & login
* ✅ **User Profile** - View/edit account details, stats, order history
* ✅ **Role-Based Access** - Separate admin and customer interfaces

### 🍎 Product Management
* ✅ **Browse Products** - Apple, Grapes, Banana, Orange, Watermelon, Papaya, Dragon Fruit
* ✅ **Product Detail Page** - Images, prices, stock info, product reviews
* ✅ **Add to Cart** - Seamless cart functionality with localStorage
* ✅ **Cart Management** - View, modify, checkout

### 📍 Location & Shop Features
* ✅ **Nearby Shops Locator** - Geolocation to find closest vendors
* ✅ **Distance Calculation** - Haversine formula for accurate distances
* ✅ **Shop Inventory** - Real-time stock availability per shop
* ✅ **Google Maps Integration** - Get directions to shops
* ✅ **Call Shop** - Direct phone call button

### 🛒 Order Management
* ✅ **Multiple Payment Methods**
  - Cash on Delivery
  - Bank Transfer (with slip upload)
  - Online Payment (card details)
* ✅ **Order Tracking** - Real-time status updates (Pending → Processing → Shipped → Delivered)
* ✅ **My Orders Page** - View all orders with search & filter
* ✅ **Order Success Page** - Confirmation with receipt download
* ✅ **PDF Receipt Generation** - Automatic receipt with jsPDF

### ⭐ Reviews & Ratings
* ✅ **Customer Reviews** - Leave comments & star ratings
* ✅ **Review Display** - Read reviews from other customers
* ✅ **One Review Per Product** - Prevent duplicate reviews
* ✅ **Order-Based Reviews** - Only verified buyers can review

### 🏪 Admin Features
* ✅ **Store Management** - Add, edit, delete shops
* ✅ **Product Management** - Manage inventory across shops
* ✅ **Order Management** - Monitor all orders
* ✅ **User Management** - View customer data
* ✅ **Review Management** - Moderate customer reviews
* ✅ **Shop Statistics** - Total stores, products, inventory metrics

### 📱 Additional Features
* ✅ **Contact Page** - Contact form with Google Maps embed
* ✅ **About Section** - Company story & mission
* ✅ **Favicon** - Professional browser tab icon
* ✅ **Toast Notifications** - User feedback (react-hot-toast)
* ✅ **Loading States** - Smooth loading indicators
* ✅ **Error Handling** - Comprehensive error messages

---

## 🧰 Tech Stack

### 🖥️ Frontend
* **React.js** - UI library
* **Vite** - Build tool
* **Tailwind CSS** - Styling
* **Axios** - HTTP client
* **React Router** - Navigation
* **React Hot Toast** - Notifications
* **jsPDF + AutoTable** - Receipt generation

### ⚙️ Backend
* **Node.js** - Runtime
* **Express.js** - Server framework
* **MongoDB** - Database
* **Mongoose** - ODM
* **JWT** - Authentication
* **Supabase** - Image storage
* **Helmet** - Security headers
* **CORS** - Cross-origin requests
* **Rate Limiting** - API protection

### 🔧 Security & Tools
* **dotenv** - Environment variables
* **bcryptjs** - Password hashing
* **Postman** - API testing
* **Git** - Version control

## 📁 Project Structure
fruitflow/

│

├── frontend/src/

│   ├── pages/

│   │   ├── splash.jsx              ✅ Intro animation

│   │   ├── login.jsx               ✅ Login form

│   │   ├── signup.jsx              ✅ Registration form

│   │   ├── home.jsx                ✅ Landing page

│   │   ├── product.jsx             ✅ Product listing

│   │   ├── productDetail.jsx       ✅ Product details + reviews + nearby shops

│   │   ├── cartt.jsx               ✅ Shopping cart

│   │   ├── checkout.jsx            ✅ Order checkout

│   │   ├── orderSuccess.jsx        ✅ Order confirmation

│   │   ├── profile.jsx             ✅ User profile

│   │   ├── myOrders.jsx            ✅ Order history

│   │   ├── shop.jsx                ✅ Shop listing

│   │   ├── contact.jsx             ✅ Contact page

│   │   └── admin.jsx               ✅ Admin dashboard

│   │

│   ├── components/

│   │   ├── header.jsx              ✅ Navigation

│   │   ├── footer.jsx              ✅ Footer

│   │   ├── productCard.jsx         ✅ Product card

│   │   └── userData.jsx            ✅ User info

│   │

│   └── utils/

│       ├── cart.js                 ✅ Cart logic

│       └── generateReceipt.js      ✅ PDF generation

│

├── backend/

│   ├── controllers/

│   │   ├── userController.js       ✅ Auth & users

│   │   ├── productController.js    ✅ Products

│   │   ├── orderController.js      ✅ Orders

│   │   ├── reviewController.js     ✅ Reviews

│   │   ├── paymentController.js    ✅ Payments

│   │   └── shopController.js       ✅ Shops

│   │

│   ├── models/

│   │   ├── user.js                 ✅ User schema

│   │   ├── product.js              ✅ Product schema

│   │   ├── order.js                ✅ Order schema

│   │   ├── review.js               ✅ Review schema

│   │   ├── payment.js              ✅ Payment schema

│   │   └── shop.js                 ✅ Shop schema

│   │

│   └── routes/

│       ├── userRoute.js

│       ├── productRoute.js

│       ├── orderRoute.js

│       ├── reviewRoute.js

│       ├── paymentRoute.js

│       └── shopRoute.js

│

└── public/

├── favicon.svg                 ✅ Favicon

└── intro-video.mp4             ✅ Splash animation

---

---

## ⚙️ Getting Started

### 📥 Clone Repository
```bash
git clone https://github.com/your-username/fruitflow.git
cd fruitflow
```

### 🔧 Backend Setup
```bash
cd backend
npm install
# Create .env file with:
PORT=3000
MONGO_URI=mongodb://localhost:27017/fruitflow
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
npm start
```

### 🖥️ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🌍 Access Application
* **Frontend** → http://localhost:5173
* **Backend API** → http://localhost:3000
* **Splash Screen** → Auto-loads on first visit (5 seconds)

---

## 📦 Products Available

* 🍎 **Apple** - Fresh red apples
* 🍇 **Grapes** - Sweet green/red grapes
* 🍌 **Banana** - Ripe bananas
* 🍊 **Orange** - Juicy oranges
* 🍉 **Watermelon** - Fresh watermelons
* 🧡 **Papaya** - Tropical papaya
* 🐉 **Dragon Fruit** - Exotic dragon fruit

---

## 🔌 API Endpoints

### Authentication
POST   /users/register      - Register new user

POST   /users/login         - User login

GET    /users/:id           - Get user profile

PUT    /users/:id           - Update profile

### Products
GET    /products            - List all products

GET    /products/:productID - Get product details

### Orders
POST   /orders              - Create order

GET    /orders              - Get all orders

GET    /orders/:orderID     - Get order details

PUT    /orders/:orderID     - Update order status

### Reviews
POST   /reviews             - Create review

GET    /reviews             - Get all reviews

DELETE /reviews/:reviewID   - Delete review (admin)

### Payments
POST   /payments            - Process payment

GET    /payments/:paymentID - Get payment details

### Shops
GET    /shops               - List all shops

POST   /shops               - Add shop (admin)

GET    /shops/:shopID       - Get shop details

PUT    /shops/:shopID       - Update shop

DELETE /shops/:shopID       - Delete shop (admin)

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
# Set environment variables
# Deploy Node app
```

---

## 🔐 Security Features

* ✅ **JWT Authentication** - Secure token-based auth
* ✅ **Password Hashing** - bcryptjs encryption
* ✅ **CORS Protection** - Cross-origin security
* ✅ **Rate Limiting** - API throttling
* ✅ **Helmet** - HTTP headers security
* ✅ **Input Validation** - Data sanitization
* ✅ **Environment Variables** - Sensitive data protection

---

## 📊 Key Metrics

* **7 Products** - Fresh fruit options
* **Multiple Payment Methods** - Cash, Bank, Online
* **Real-time Order Tracking** - 4 status stages
* **Geolocation Support** - Nearby shops finder
* **Review System** - Customer ratings & feedback
* **Responsive Design** - Mobile-first approach
* **Admin Dashboard** - Complete management suite

---

## 🗺️ Roadmap

* [x] Project Setup & Architecture
* [x] Authentication System
* [x] Product Management
* [x] Shopping Cart
* [x] Order System
* [x] Multiple Payment Methods
* [x] Review System
* [x] Shop Locator (Geolocation)
* [x] Admin Dashboard
* [x] Responsive UI
* [x] Splash Screen Animation
* [x] PDF Receipt Generation
* [ ] Real-time Chat Support
* [ ] AI Product Recommendations
* [ ] Delivery Tracking Map
* [ ] Email Notifications
* [ ] SMS Alerts

---

## 💡 Future Enhancements

* 🤖 AI-based fruit recommendations
* 📧 Email order confirmations
* 💬 Live chat support
* 📊 Analytics dashboard
* 🚚 Real-time delivery tracking
* ⭐ Advanced rating filters
* 🎁 Loyalty points system
* 🔔 Push notifications

---

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see LICENSE file for details.

---

## 👨‍💻 Author

**Ramesh Krishan**  
🔗 GitHub: https://github.com/ramesh-2003-krishan  
📧 Email: your-email@example.com

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

### Quick Links
* 🌐 [Live Demo](https://fruitflow.com) *(coming soon)*
* 📚 [Documentation](./docs)
* 🐛 [Report Issues](https://github.com/your-username/fruitflow/issues)
* 💬 [Discussions](https://github.com/your-username/fruitflow/discussions)

---

**Made with ❤️ for fresh fruit lovers 🍎🍌🍇**
