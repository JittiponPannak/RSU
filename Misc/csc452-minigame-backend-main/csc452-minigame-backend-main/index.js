const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.MYSQL_URI)

app.get('/', (req, res) => {
    res.send('Hello world!!')
})

app.get('/leaderboard', (req, res) => {
    connection.query(
        'SELECT * FROM MINIGAME.Users ORDER BY SCORE DESC LIMIT 10;',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/users', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM `MINIGAME`.`Users` WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.post('/users', (req, res) => {
    connection.query(
        'INSERT INTO MINIGAME.Users (NAME, SCORE, DATE, GAMEOVER) VALUES (?,?,?,?)',
        [req.body.NAME, req.body.SCORE, req.body.DATE, req.body.GAMEOVER],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /users:', err);
                res.status(500).send('Error adding user');
            } else {
                res.status(200).send(results);
            }
        }
    )
})

app.put('/users', (req, res) => {
    connection.query(
        'UPDATE MINIGAME.Users SET SCORE=?, DATE=?, GAMEOVER=? WHERE ID = ?',
        [req.body.SCORE, req.body.DATE, req.body.GAMEOVER, req.body.ID],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.delete('/users', (req, res) => {
    connection.query(
        'DELETE FROM MINIGAME.Users WHERE ID = ?',
        [req.body.ID],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled web server listening on port 3000')
})

// export the app for vercel serverless functions
module.exports = app;
