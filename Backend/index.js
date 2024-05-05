const express = require('express')
const app = express();
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'qwer',
    database: 'chattingapp',
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
const io = require('socket.io')(3001, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST"],
    },
})
io.on('connection', socket =>{
    console.log(socket.id)
    socket.on('send-message', (message, room) => {
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

// app.post('/working/a', (req, res) => {
//     const {email} = req.body;
//     if (!email){
//         res.status(418).send({message: "error!"})
//         console.log("nuar")
//     }
//     res.send({
//         email: email,
        
//     })
// })
















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
    const addFriend = "INSERT INTO friends(email,userName,myEmail) VALUES (?,?,?);"
    db.query(userFind,[req.body.Email], (err, result) => {
        if(err)
        {
            console.log(err)
            return res.status(404).json(err)
        }
        else if(result.length > 0)
        {
            db.query(addFriend,[req.body.Email, result[0].username, req.body.myEmail], (err2, result2) => {
                if(err2)
                {
                    console.log(err2)
                    return res.status(404).json(err2)
                }
                else{
                    return res.json(result2)
                }
            })
            return res.json(result)
        }
        else
        {
            return res.status(404).json(err)
        }
    })
    


});
app.post('/contacts', (req, res) => {
    const userFind = "SELECT * FROM friends WHERE myEmail = ?;"
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

app.listen(3000, () =>{
    console.log("running on port 3000")
});

// app.all("/api/*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   return next();
// });