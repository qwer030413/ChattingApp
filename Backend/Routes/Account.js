const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'qwer',
    database: 'chattingapp',
});
router.post('/getPFP', (req, res) => {
    const userFind = "SELECT * FROM users WHERE email = ?;"
    db.query(userFind,[req.body.email], (err, result) => {
        if(result.length > 0){
            return res.json(result)
        }
        else{
            return res.status(404).json(err)
        }
        
    })
})
router.post('/getCurUserPFP', (req, res) => {
    const userFind = "SELECT * FROM users WHERE email = ?;"
    db.query(userFind,[req.body.email], (err, result) => {
        if(result.length > 0){
            return res.json(result)
        }
        else{
            return res.status(404).json(err)
        }
        
    })
})
router.post('/saveBio', (req, res) => {
    const userFind = "UPDATE users SET Bio = ? WHERE email = ?;"
    db.query(userFind,[req.body.aboutMe, req.body.email], (err, result) => {
        if(err){
            return res.status(404).json(err)
            
        }
        else{
            return res.json(result)
        }
        
    })
})
router.post('/changeName', (req, res) => {
    const userFind = "UPDATE users SET username = ? WHERE email = ?;"
    db.query(userFind,[req.body.newName, req.body.email], (err, result) => {
        if(err){
            return res.status(404).json(err)
        }
        else{
            return res.json(result)
        }
        
    })
})

module.exports = router;