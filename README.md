
# 🔗 URL Shortener API

A simple and secure URL shortener built using **Node.js**, **Express**, and **MongoDB**. Includes user authentication and analytics for each shortened URL.

---

## 📁 Project Structure

```
urlShortener/
├── src
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Signup/Login logic
│   │   └── urlController.js     # URL shortening, redirection, analytics
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT auth middleware
│   ├── models/
│   │   ├── urlModel.js          # Schema for URLs
│   │   └── userModel.js         # Schema for users
│   └── routes/
│       ├── authRoutes.js        # /auth/signup, /auth/login
│       └── urlRoutes.js         # /url/...
├── app.js                       # Express app setup
└── index.js                     # Entry point
```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

---

## 🔐 User Authentication

### Signup
**POST** `/auth/signup`

```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

### Login
**POST** `/auth/login`

Returns a **JWT token** to use with protected routes.

---

## ✂️ Shorten a URL

**POST** `/url/`

**Headers:**  
`Authorization: Bearer <token>`

**Body:**
```json
{
  "url": "https://example.com"
}
```

Returns:
```json
{
  "message": "Short URL created successfully",
  "id": "shortId",
  "data": { ... }
}
```

---

## 🔁 Redirect

**GET** `/url/:shortId`

Redirects to the original URL and logs the visit.

---

## 📊 Get Analytics

**GET** `/url/analytics/:shortId`

**Headers:**  
`Authorization: Bearer <token>`

Returns:
```json
{
  "totalClicks": 3,
  "visitHistory": [
    { "timestamp": 1710000000000 },
    ...
  ]
}
```

---

## ⚙️ Setup

1. Clone the repo  
2. Run `npm install`  
3. Set up your `.env` file:

```
JWT_SECRET_KEY=your_secret_key
```

4. Run the server:

```bash
npm start
```

Default port: `http://localhost:3001`

---

## 📌 Notes

- All sensitive routes are protected using JWT
- MongoDB runs locally on `mongodb://127.0.0.1:27017/short-url`

---

## 🧑‍💻 Author

Made by **Ramit Taparia**

---

## 📃 License

MIT
