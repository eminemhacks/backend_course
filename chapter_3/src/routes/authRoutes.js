import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

// Register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    // Saving new user and hashing password to DB
    try {
        const insertUser = db.prepare(`INSERT INTO user (username, password) VALUES (?, ?)`);
        const result = insertUser.run(username, hashedPassword);

        const defaultTodo = `Hello :) Add your first todo!`;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        // Create TOKEN
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24' });
        res.json({ token });
        // res.sendStatus(201);
    }catch (err){
        console.log (err.message);
        res.sendStatus(503);
    }

});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        const getUser = db.prepare('SELECT * FROM user WHERE username = ?');
        const user = getUser.get(username);

        if(!user){ return res.status(404).send({message: "User not Found" }) }
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }       
});

export default router;