const app = require('./app.js');

const connectDB = require('./src/config/db.js');

const PORT = 3001;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
}); 