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
const loginCloseBtn = document.getElementById('log-in-close');

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
loginCloseBtn.addEventListener('click', closeLogin);