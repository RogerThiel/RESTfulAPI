const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Users Routen
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.post('/users', (req, res) => {
  const { first_name, last_name, age } = req.body;
  db.query('INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3)', [first_name, last_name, age], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json(results.rows);
  });
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, age } = req.body;

  db.query(
    'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4',
    [first_name, last_name, age, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
});

// Orders Routen
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.post('/orders', (req, res) => {
  const { price, date, user_id } = req.body;
  db.query('INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3)', [price, date, user_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json(results.rows);
  });
});

app.put('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { price, date, user_id } = req.body;

  db.query(
    'UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4',
    [price, date, user_id, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Order modified with ID: ${id}`);
    }
  );
});

app.delete('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM orders WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Order deleted with ID: ${id}`);
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});