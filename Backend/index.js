const express = require('express')
const app = express();
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = mysql.createPool({
    host: "sql3.freesqldatabase.com",
    user: 'sql3693803',
    password: 'LsEbaJeHfh',
    database: 'sql3693803',
});

