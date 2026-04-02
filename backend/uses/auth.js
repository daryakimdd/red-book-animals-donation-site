const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { makeAccessToken, makeRefreshToken, REFRESH_TOKEN } = require('../tokens/jwt');

const prisma = new PrismaClient();

async function login(req, res) {
    try {
        const { login, password } = req.body;

        const user= await prisma.user.findUnique({ where:{login} });

        //проверка на логин/пароль
        if (!user) {
            console.log(`Логин не найден: ${login}`);
            return res.status(401).json({ error: 'неверный логин/пароль' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            console.log(`Неправильный пароль: ${login}`);
            return res.status(401).json({ error: 'неверный логин/пароль' });
        }

        //генерация аксес  и рефреш
        const accessToken = makeAccessToken(user);
        const refreshToken = makeRefreshToken(user);
        await prisma.refreshToken.create({data: {token: refreshToken, userId: user.id}});

        //рефреш токен в куку
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            maxAge: 30 * 24 * 60 * 60 * 1000 
        });
    
        res.json({ accessToken }); 
    }catch (err) {
        console.error("ошибка: ", err);
        res.status(500).json({ error: err.message });
    }
}

//эндпоинт, чтобы обновить access nтокен
async function refresh(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            console.log('нет refresh токена');
            return res.sendStatus(401);
        }

        const tokenFromDb = await prisma.refreshToken.findUnique({
            where: { token: refreshToken }
        });
        if (!tokenFromDb){
            console.log('токена не найден в дб');
            return res.sendStatus(403);
        }

        let decoded;
        try{
            decoded = jwt.verify(refreshToken, REFRESH_TOKEN);
        } catch (err){
            console.log('Ошибка валидации refresh токена');
            return res.sendStatus(403);
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.id } 
        });
        if (!user) {
            console.log('Пользователь не найден при refresh');
            return res.sendStatus(404);
        }
        const accessToken = makeAccessToken(user);
        return res.json({accessToken});

     } catch (err){
        console.error('ошибка: ', err);
        res.status(500).json({ error: 'не получилось обновить токен' });
    }
}

async function logout(req, res){
    const refreshToken= req.cookies.refreshToken;
    await prisma.refreshToken.deleteMany({ where: {token: refreshToken} });
    res.clearCookie('refreshToken');
    res.sendStatus(204);
}

module.exports = { login, refresh, logout };


//norm