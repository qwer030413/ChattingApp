const express = require('express')
const app = express();
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const path = require('path')
const userRoute = require('./Routes/Users')
const chatRoute = require('./Routes/Chats')
const AccRoute = require('./Routes/Account')
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
app.use('/users', userRoute)
app.use('/chats',chatRoute)
app.use('/account',AccRoute)
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
    
    db.query(userFind,[req.file.filename, req.body.email], (err, result) => {
        if(err){
            return res.status(404).json(err)
        }
        else{
             return res.json(req.file.filename)
        }
        
    })
    
})

app.post('/StoreContactActivity', (req, res) => {
    const userFind = "UPDATE friends SET activity = ? WHERE myEmail = ? AND email = ?;"
    db.query(userFind,[req.body.activity, req.body.myEmail, req.body.email], (err, result) => {
        if(err){
            return res.status(404).json(err)
        }
        else{
            return res.json(result)
        }
        
    })
})
app.listen(3000, () =>{
    console.log("running on port 3000")
});

