const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'qwer',
    database: 'chattingapp',
});


router.post('/signUp', (req, res) => {
    const signUp = "INSERT INTO users(email, pw, userName) VALUES (?,?,?);"
    db.query(signUp,[req.body.newEmail, req.body.newPassword, req.body.newName], (err, result) => {
        if(err)
        {
            return res.status(404).json(err)
        }
        else if(result.length > 0)
        {
            return res.json(result)
        }
        else
        {
            return res.json(err)
        }
    })
});
router.post('/login', (req, res) => {
    const userFind = "SELECT * FROM users WHERE email = ? AND pw = ?;"

    db.query(userFind,[req.body.Email, req.body.Password], (err, result) => {
        if(err)
        {
            console.log(err)
            return res.status(404).json(err)
        }
        else if(result.length > 0)
        {
            console.log(result)
            return res.json(result)
        }
        else
        {
            return res.status(404).json(err)
        }
    })
    


});
router.post('/friendReq/:from/:to', (req, res) => {
    
    const request = "INSERT INTO friendreq(fromEmail, toEmail) VALUES (?,?);"
    const userfind = "SELECT * FROM users WHERE email = ?;"
    db.query(request,[req.body.myEmail, req.body.Email,], (err, result) => {
        db.query(userfind,[req.body.Email,],(err2, result2) => {
            if(err || err2)
            {
                return res.status(404).json(err)
            }
            else if(result2.length > 0)
            {
                res.send({
                    myEmail: req.body.myEmail,
                    toEmail: req.body.Email,
                    
                })
            }
            else{
                return res.status(404).json(err)
            }
        })
    })
    
})
router.post('/AddFriend', (req, res) => {
    const userFind = "SELECT * FROM users WHERE email = ?;"
    const addFriend = "INSERT INTO friends(email,myEmail) VALUES (?,?);"
    db.query(addFriend,[req.body.Email,req.body.myEmail], (err1, result1) => {
        if(err1)
        {
            console.log(err1)
            return res.status(404).json(err1)
        }
        
    })
    db.query(addFriend,[req.body.myEmail,req.body.Email], (err2, result2) => {
        if(err2)
        {
            console.log(err2)
            return res.status(404).json(err2)
        }
        
    })         

});
router.post('/contacts', (req, res) => {
    const userFind = "SELECT DISTINCT email, activity FROM friends WHERE myEmail = ?;"
    
    db.query(userFind,[req.body.email], (err, result) => {
        if(err)
        {
            console.log(err)
            return res.status(404).json(err)
        }
        else if(result.length > 0)
        {
            return res.json(result)
        }
        else
        {
            return res.status(404).json(err)
        }
        
    })
});
router.post('/getName', (req, res) => {
    const userInfo = "SELECT * FROM users WHERE email = ?;"
    db.query(userInfo,[req.body.email], (err, result) => {
        if(err)
        {
            console.log(err)
            return res.status(404).json(err)
        }
        else if(result.length > 0)
        {
            return res.json(result)
        }
        else
        {
            return res.status(404).json(err)
        }
    })
});
router.post('/getFriendReq', (req, res) => {
    const userFind = "SELECT * FROM friendreq WHERE toEmail = ?;"
    db.query(userFind,[req.body.email], (err, result) => {
        
        if(err)
        {
            console.log(err)
            return res.status(404).json(err)
        }
        
        else
        {
            return res.json(result)
        }
    })
});
router.post('/deleteRequest', (req, res) => {
    const deleteToDo = "DELETE FROM friendreq WHERE fromEmail=? AND toEmail=?;"
    db.query(deleteToDo,[req.body.fromEmail, req.body.recieveEmail], (err, result) => {
        if(err)
        {
            console.log(err)
        }
        
        
    })
});
router.post('/getFriendId', (req, res) => {
    const userFind = "SELECT * FROM users WHERE email = ?;"
   
    db.query(userFind,[req.body.email], (err, result) => {
        if(err)
        {
            return res.status(404).json(err)
        }
        else{
            return res.json(result)
        }
        
    })
    
})

module.exports = router;