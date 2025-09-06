import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const port = process.env.PORT || 5003;

// Resolve paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Auth routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
