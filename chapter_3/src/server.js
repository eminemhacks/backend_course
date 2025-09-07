import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5003;

// Resolve paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/dashboard', (req, res) => {
    // console.log("<h1>Hit dashboard endpoint</h1>");
    res.send(`
        <body>
        <h1>Welcome</h1><p>This is the dashboard</h1>
        <a href="/">Go to Home</a>
        </body>`);
});

// Serve everything from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Auth routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
