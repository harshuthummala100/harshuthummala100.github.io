
const express = require('express');
const path    = require('path');
const { Pool } = require('pg');

const app  = express();
const PORT = 3000;

const connectionString = 'postgres://postgres:CTI_110_WakeTech@localhost/Gradebook';
const pool = new Pool({ connectionString });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
    res.sendFile(
      path.join(__dirname, 'public', 'HarshuThummala_gradebook.html')
    );
  });
  

app.get('/api/grades', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.student_id,
             s.first_name,
             s.last_name,
             AVG(a.grade) AS total_grade
        FROM Students s
        LEFT JOIN Assignments a
          ON a.student_id = s.student_id
    GROUP BY s.student_id
    ORDER BY total_grade DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
