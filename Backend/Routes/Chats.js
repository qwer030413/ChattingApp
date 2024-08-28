const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'qwer',
    database: 'chattingapp',
});

router.post('/DisplayMessages', (req, res) => {
    const userFind = "SELECT * FROM chats WHERE (fromEmail = ? AND toEmail = ? )OR (fromEmail = ? AND toEmail = ?);"
    db.query(userFind,[req.body.fromEmail, req.body.toEmail, req.body.toEmail, req.body.fromEmail], (err, result) => {
        if(err)
        {
            return res.status(404).json(err)
        }
        if(req.body.fromEmail != "" && req.body.fromEmail != ""){
            return res.json(result)
        }
        
    })
    
})
router.post('/getUserName', (req, res) => {
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
router.post('/StoreChats', (req, res) => {
    const request = "INSERT INTO chats(fromEmail, toEmail, chat) VALUES (?,?,?);"
    db.query(request,[req.body.fromEmail, req.body.toEmail, req.body.text], (err, result) => {
        if(err)
        {
            return res.status(404).json(err)
        }
        else{
            return res.json(result)
        }
        
    })
    
})
router.post('/getChatPFP', (req, res) => {
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



module.exports = router;