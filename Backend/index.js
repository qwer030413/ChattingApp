const express = require('express')
const app = express();
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const path = require('path')

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'qwer',
    database: 'chattingapp',
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('images'))
const io = require('socket.io')(3001, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST"],
    },
})
io.on('connection', socket =>{
    socket.on('send-message', (message, room) => {
        console.log(message)
        if(room == ""){
            socket.broadcast.emit('recieve-message', message)
        }
        else{
            console.log(message)
            socket.to(room).emit('recieve-message', message)
        }
    })
    
})











// app.get('/working', (req, res) => {
//     res.status(200).send({
//         pleasework: "worked!"
//     })
// })

app.post('/friendReq/:from/:to', (req, res) => {
    
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



app.post('/signUp', (req, res) => {
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
app.post('/login', (req, res) => {
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
app.post('/AddFriend', (req, res) => {
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
app.post('/contacts', (req, res) => {
    const userFind = "SELECT DISTINCT email FROM friends WHERE myEmail = ?;"
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
app.post('/getName', (req, res) => {
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
app.post('/getFriendReq', (req, res) => {
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

app.post('/deleteRequest', (req, res) => {
    const deleteToDo = "DELETE FROM friendreq WHERE fromEmail=? AND toEmail=?;"
    db.query(deleteToDo,[req.body.fromEmail, req.body.recieveEmail], (err, result) => {
        if(err)
        {
            console.log(err)
        }
        
        
    })
});
app.post('/AcceptFriend/:from/:to', (req, res) => {
    
    const userFind = "SELECT * FROM users WHERE email = ?;"
    const request = "INSERT INTO friends(email, myEmail) VALUES (?,?);"
    db.query(request,[req.body.fromEmail,req.body.recieveEmail], (err, result) => {
        if(err)
        {
            console.log("wee")
            return res.status(404).json(err)
        }
        else
        {
            res.send({
                myEmail: req.body.myEmail,
                toEmail: req.body.Email,
                
            })
            // return res.json(result)
        }
    })
    
})
app.post('/socketid', (req, res) => {
    const userFind = "UPDATE users SET id= ? WHERE email = ?;"
   
    db.query(userFind,[req.body.id, req.body.email], (err, result) => {
        if(err)
        {
            return res.status(404).json(err)
        }
        else{
            return res.json(result)
        }
        
    })
    
})
app.post('/getFriendId', (req, res) => {
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
app.post('/StoreChats', (req, res) => {
    // const userFind = "SELECT * FROM chats WHERE (fromEmail = ? AND toEmail = ? )OR (fromEmail = ? AND toEmail = ?);"
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
    // db.query(userFind,[req.body.fromEmail, req.body.toEmail, req.body.toEmail, req.body.fromEmail], (err, result) => {
    //     if(err)
    //     {
    //         return res.status(404).json(err)
    //     }
    //     else{
    //         return res.json(result)
    //     }
        
    // })
    
})
app.post('/DisplayMessages', (req, res) => {
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
app.post('/getUserName', (req, res) => {
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})



app.post('/SetPFP', upload.single('image'), (req, res) => {
    const userFind = "UPDATE users SET PFP = ? WHERE email = ?;"
    // console.log(req.file)
    // console.log(req.body.email)
    db.query(userFind,[req.file.filename, req.body.email], (err, result) => {
        console.log(result)
        if(err){
            return res.status(404).json(err)
        }
        else{
             return res.json(req.file.filename)
        }
        
    })
    
})
app.post('/getPFP', (req, res) => {
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




app.listen(3000, () =>{
    console.log("running on port 3000")
});

