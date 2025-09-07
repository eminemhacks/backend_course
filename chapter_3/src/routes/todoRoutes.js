import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all todos for a user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId);
    res.json(todos);
});

router.post('/', (req, res) => {
    const { title, completed } = req.body;
    const addTodo = db.prepare('INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)');
    const info = addTodo.run(title, completed, req.userId);
    res.status(201).json({ id: info.lastInsertRowid, title, completed });
});

router.put('/:id', (req, res) => {
    const { title, completed } = req.body;
    const updateTodo = db.prepare('UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?');
    const result = updateTodo.run(title, completed, req.params.id, req.userId);
    if (result.changes > 0) {
        res.json({ id: req.params.id, title, completed });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

router.delete('/:id', (req, res) => {
    const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?');
    const result = deleteTodo.run(req.params.id, req.userId);
    if (result.changes > 0) {
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

export default router;