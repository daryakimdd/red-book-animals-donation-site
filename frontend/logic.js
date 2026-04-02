    // КАРУСЕЛЬ (переработанная)
const carusel = document.querySelector('.carusel');
const images = document.querySelectorAll('.carusel img');

const angleChng = 360 / carusel.children.length;
let nowrot = 0;

// подсветка передней карточки
function updateCards() {
    images.forEach((img, index) => {
        const angle = (index + 1) * angleChng;
        const pos = Math.abs((angle + nowrot) % 360);

        if (pos === 0) {
            img.style.filter = 'brightness(110%)';
            img.style.transform =
                `rotateY(${angle}deg) translateZ(${carusel.children.length * 12}rem) scale(1.3)`;
        } else {
            img.style.filter = 'brightness(50%)';
            img.style.transform =
                `rotateY(${angle}deg) translateZ(${carusel.children.length * 12}rem) scale(0.8)`;
        }
    });
}

updateCards();

// расстановка и обработка кликов
images.forEach((img, index) => {
    const angle = (index + 1) * angleChng;

    img.style.transform =
        `rotateY(${angle}deg) translateZ(${carusel.children.length * 12}rem)`;

    img.onclick = () => {
        let vRotDirection = (-angle - nowrot) % 360;

        if (vRotDirection > 180) vRotDirection -= 360;
        else if (vRotDirection < -180) vRotDirection += 360;

        nowrot += vRotDirection;

        carusel.style.transform =
            `perspective(2000px) rotateY(${nowrot}deg)`;

        updateCards();
    };
});


    // МЕНЮ СЛЕВА

const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const poMenu = document.getElementById('pull-out-menu');
const overlay = document.getElementById('overlay-menu');

function open_po_Menu() {
    poMenu.classList.add('active');
    overlay.classList.add('active');
}

function close_po_Menu() {
    poMenu.classList.remove('active');
    overlay.classList.remove('active');
}

openMenuBtn.addEventListener('click', open_po_Menu);
closeMenuBtn.addEventListener('click', close_po_Menu);

overlay.addEventListener('click', () => {
    if (poMenu.classList.contains('active')) {
        close_po_Menu();
    }
});



// МЕНЮ АВТОРИЗАЦИИ

const profileBtn = document.getElementById('profile-button');
const loginMenu = document.getElementById('log-in-menu');
const panelCloseBtn = document.getElementById('log-in-reg-panel-close');

function openLogin() {
    loginMenu.classList.add('active');
}
function closeLogin() {
    loginMenu.classList.remove('active');
}

function toggleLogin() {
    if (loginMenu.classList.contains('active')) {
        closeLogin();
    } else {
        openLogin();
    }
}

profileBtn.addEventListener('click', toggleLogin);
panelCloseBtn.addEventListener('click', closeLogin);




// АВТОРИЗАЦИЯ
const form = document.getElementById('log-in-form');
const loginInput = document.getElementById('user-log-in-login');
const passwordInput = document.getElementById('user-log-in-password');
const submitBtn = document.getElementById('log-in-button');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    if (!loginInput.value.trim() || !passwordInput.value) {
        alert('Заполните все поля');
        return;
    }

    try {
        const answ= await fetch('/login',{
            method:'POST', 
            body:JSON.stringify({
                login: loginInput.value.trim(),
                password: passwordInput.value
            }),
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:'include', 
        }); 

        if (!answ.ok) {
            alert('Логин или пароль не подошёл');
            return;
        }
    
        const aToken= await answ.json();
        if (aToken?.accessToken) {
            localStorage.setItem('accessToken', aToken.accessToken);
        }
        closeLogin();

        //иногда reload не срабатывает сразу
        setTimeout(()=> location.reload(), 100);

    }  catch(err){
        console.log(err);
        alert('Ошибка: ', err);
    }
});


const limrLink = document.getElementById('log-in-menu-reg-link');
const rmliLink = document.getElementById('reg-menu-log-in-link');
const regMenu = document.getElementById('reg-panel');
const logInMenu = document.getElementById('log-in-panel');

function showLIRMenu(limLink){ 
    if (limLink==='toReg') {
        logInMenu.style.display = 'none';
        regMenu.style.display = 'flex';
    } else{
        logInMenu.style.display = 'flex';
        regMenu.style.display = 'none';
    }
}

limrLink.addEventListener('click', (e)=>{
    e.preventDefault();
    showLIRMenu('toReg');
})

rmliLink.addEventListener('click', (e)=>{
    e.preventDefault();
    showLIRMenu('toLog');
})

//norm