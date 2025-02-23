import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
    // res.render("home");
})

// -----------------------------------------------

app.listen(8800, () => {
    console.log("Connected to backend")
});

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'TjmhWSB.Mr2023!',
    database: 'tattoo-studio'
})

db.connect(err=>{
    if (err) throw err;
    console.log('Connected to DB');
})

app.use(express.json())
app.use(cors())

// ------------- CALENDAR -------------

app.get('/events', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});


app.post('/events', (req, res) => {
  const { start, end, name, surname, visit_type, note} = req.body;
  const title = `${visit_type} - ${name} ${surname}`;
  db.query('INSERT INTO events (title, start, end, name, surname, visit_type, note) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [title, start, end, name, surname, visit_type, note], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, start, end, name, surname, visit_type, note });
  });
});

app.put('/events/:id', (req, res) => {
    const { id } = req.params;
    const { name, surname, start, end, visit_type, note } = req.body;
    const title = `${visit_type} - ${name} ${surname}`;
    db.query('UPDATE events SET title = ?, name = ?, surname = ?, start = ?, end = ?, visit_type = ?, note = ? WHERE id = ?', [title, name, surname, start, end, visit_type, note, id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Event updated' });
    });
});

app.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM events WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Event deleted' });
    });
});