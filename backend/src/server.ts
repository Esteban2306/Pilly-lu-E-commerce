import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db/db.js';

const { PORT = 3001, BASE_PATH, MONGO_URI } = process.env;

connectDB(MONGO_URI || 'mongodb://localhost:27017/pilly-lu')

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${BASE_PATH ? BASE_PATH : ''}`);
})
