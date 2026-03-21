//js вынес сюда, чтобы было почище

const carusel = document.querySelector('.carusel');
const images = document.querySelectorAll('.carusel img');

const img_angle = 360 / carusel.children.length;
let nowrot = 0; //насколько повёрнута карусель

// подсветка передней карточки
function change_Brightness() {
    images.forEach((image, i) => {
        const EIAngle = (i + 1) * img_angle;

        // если картинка спереди, то она кратна 360
        let front_img = Math.abs((EIAngle + nowrot) % 360);

        if (front_img === 0) {
            image.style.filter = 'brightness(110%)';
            image.style.transform =
                `rotateY(${EIAngle}deg) translateZ(${carusel.children.length * 12}rem) scale(1.3)`;
        } else {
            image.style.filter = 'brightness(50%)';
            image.style.transform =
                `rotateY(${EIAngle}deg) translateZ(${carusel.children.length * 12}rem) scale(0.8)`;
        }
    });
}

change_Brightness();


//расставляем по кругу
images.forEach((image, i) => {
    const EIAngle = (i + 1) * img_angle;

    //по Y расставляем по кругу, потом от центра двгаем по Z
    image.style.transform =
        `rotateY(${EIAngle}deg) translateZ(${carusel.children.length * 12}rem)`;

    image.onclick = () => {
        // насколько довернуть
        let rotat = (-EIAngle - nowrot) % 360;

        //куда доворачивать
        if (rotat > 180) rotat -= 360;
        else if (rotat < -180) rotat += 360;

        nowrot += rotat;

        //поворот карусели
        carusel.style.transform =
            `perspective(2000px) rotateY(${nowrot}deg)`;

        //изменение х-к картинки
        change_Brightness();
    };
});


// меню

const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const poMenu = document.getElementById('pull-out-menu');
const overlayMenu = document.getElementById('overlay-menu');

function toggleMenu() {
    poMenu.classList.toggle('active');
    overlayMenu.classList.toggle('active');
}

openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlayMenu.addEventListener('click', toggleMenu);