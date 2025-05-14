# Short-Url

A simple URL shortener service built with Node.js, Express, MongoDB, and JWT-based authentication.

## Features

- Shorten long URLs to concise, shareable links.
- Redirect users to the original URL using the shortened link.
- JWT-based authentication for secure access.
- MongoDB integration for persistent storage.

## Project Structure

```
urlShortener/
├── src/
│   ├── config/
│   │   └── db.js             # MongoDB connection setup
│   ├── controllers/
│   │   └── urlController.js  # Logic for generating, redirecting, and analytics
│   ├── models/
│   │   └── urlModel.js       # URL schema model
│   ├── routes/
│   │   └── urlRoutes.js      # Routing definitions
│   ├── app.js                # Main Express app
├── index.js                  # Server entry point
├── package.json
├── .env.sample               # Sample environment variables
├── README.md
```

## Getting Started

### Prerequisites

- Node.js v14 or higher
- MongoDB running locally at: `mongodb://127.0.0.1:27017`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/foundRamit/Short-Url.git
   cd Short-Url
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Use `.env.sample` as a reference for required variables.

4. Start the server:

   ```bash
   node index.js
   ```

   The server will run at: [http://localhost:3001](http://localhost:3001)

## API Endpoints

- `POST /api/shorten` – Shorten a long URL.
- `GET /:shortId` – Redirect to the original URL.

## License

This project is licensed under the MIT License.
