# 🌐 URL Shortener

A simple URL shortener service built with **Node.js**, **Express**, and **MongoDB**.

---

## 📁 Project Structure

```
urlShortener/
├── src/
│ ├── config/
│ │ └── db.js # MongoDB connection setup
│ ├── controllers/
│ │ └── urlController.js # Logic for generating, redirecting, and analytics
│ ├── models/
│ │ └── urlModel.js # URL schema model
│ ├── routes/
│ │ └── urlRoutes.js # Routing definitions
│ ├── app.js # Main Express app
├── index.js # Server entry point
├── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14+
- **MongoDB** running locally at:  
  `mongodb://127.0.0.1:27017`

---

### 🔧 Installation

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener/urlShortener
npm install
```

---

### ▶️ Start the Server

```bash
node index.js
```

Server runs at:  
**http://localhost:3001**

---

## 📌 API Endpoints

### 1. 🔗 Shorten a URL

**POST** `/url`

#### Request Body

```json
{
  "url": "https://example.com"
}
```

#### Response

```json
{
  "id": "abc123"
}
```

---

### 2. 🔁 Redirect to Original URL

**GET** `/url/:shortId`

Redirects the user to the original long URL.

#### Example

```bash
curl -L http://localhost:3001/url/abc123
```

---

### 3. 📊 Get Analytics for a Short URL

**GET** `/url/analytics/:shortId`

Returns click analytics for a short URL.

#### Response

```json
{
  "totalClicks": 5,
  "visitHistory": [
    { "timestamp": 1715325640000 },
    { "timestamp": 1715328740000 }
  ]
}
```

#### Example

```bash
curl http://localhost:3001/url/analytics/abc123
```

---

## 🧪 Example cURL Commands

```bash
# Shorten a new URL
curl -X POST http://localhost:3001/url   -H "Content-Type: application/json"   -d '{"url": "https://google.com"}'

# Visit the shortened URL
curl -L http://localhost:3001/url/abc123

# Get analytics for the shortened URL
curl http://localhost:3001/url/analytics/abc123
```

---

## 🛠️ Troubleshooting

- ✅ Make sure MongoDB is running.
- 📍 All routes are prefixed with `/url`.

---

## 📃 License

**MIT**