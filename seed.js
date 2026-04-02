require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    //хэш пароль
    const hashedPassword = await bcrypt.hash('admin123', 10);

    console.log('начинаю заполнение базы...');

    //добавление в дб
    const user = await prisma.user.upsert({
        where: { login: 'admin' },
        update: {},
        create: {
            login: 'admin',
            password: hashedPassword,
        },
    });

    console.log('тест логин: admin');
    console.log('тест пароль: admin123');
}

main()
    .catch((e) => {
        console.error('ошибка заполнения бд:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
