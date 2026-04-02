const jwt = require('jsonwebtoken');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  
//фccess token
function makeAccessToken(user) {
    return jwt.sign(
        {
            id: user.id, 
            login: user.login
        },
        ACCESS_TOKEN,
        {expiresIn: '15m'} 
    )
}

//refresh token
function makeRefreshToken(user) {
    return jwt.sign(
        {id: user.id},
        REFRESH_TOKEN,
        {expiresIn: '30d'}
    )
} 

//проверка ассеss токена
function checkAuth(req, res, next) {
    const header = req.headers.authorization;

    if (!header){
        return res.status(401).json({error:'Нет токена'});
    }

    const pcs = header.split(' ');
    const token = pcs.length === 2 ? pcs[1]:null;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            //иногда попадает не только expired
            return res.status(403).json({error:'Токен невалиден'});
        } 

        req.user= decoded;
        next(); 
    }); 
}

module.exports= {
    makeAccessToken,
    makeRefreshToken,
    checkAuth,
    REFRESH_TOKEN
};

//norm