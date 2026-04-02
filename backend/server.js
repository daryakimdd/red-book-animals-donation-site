const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') }); //токены
const express = require('express');
const cookieParser = require('cookie-parser');

//логика
const { login, refresh, logout } = require('./uses/auth'); 
const { authenticateToken } = require('./tokens/jwt');


const app = express();
const PORT = 6767;

app.use(express.json());
app.use(cookieParser());

//чтобы файлы были публичными
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

//auth
app.post('/login', login);
app.post('/refresh', refresh);
app.post('/logout', logout);

//для spa
app.get(/^(?!\/api).+/, (req, res)=> {
    res.sendFile(path.join(frontendPath,'index.html'));
});


app.listen(PORT, ()=> {
    console.log(`сервер: http://localhost:${PORT}`);
});


//norm