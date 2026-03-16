//js вынес сюда, чтобы было почище

const carusel = document.querySelector('.carusel')
const images = document.querySelectorAll('.carusel img')
const img_angle = 360 / carusel.children.length
let nowrot = 0; //насколько повёрнута карусель

//добавил изменение размера и яркости, в зависимости от того, картинка спереди или нет
function change_Brightness(){
    images.forEach((image,i) => {
        const EIAngle = (i + 1) * img_angle; 
        
        let front_img = Math.abs((EIAngle+nowrot)%360); //если картинка впереди, то она кратна 360
        if(front_img==0){
            image.style.filter=`brightness(110%)`
            image.style.transform = `rotateY(${EIAngle}deg) translateZ(${carusel.children.length * 12}rem) scale(1.3)`
        }
        else{
            image.style.filter=`brightness(50%)`
            image.style.transform = `rotateY(${EIAngle}deg) translateZ(${carusel.children.length * 12}rem) scale(0.8)`
        }


    })
}

    change_Brightness();


images.forEach((image,i) => {
    const EIAngle = (i + 1) * img_angle;  //угол для Each Image

    //типа по Y расставляем по кругу, потом от центра по Z двигаем
    image.style.transform = `rotateY(${EIAngle}deg) translateZ(${carusel.children.length * 12}rem)`;

    
    image.onclick = ()=> {
    
        let rotat = (-EIAngle - nowrot) % 360; // насколько довернуть
        
        //куда крутить
        if (rotat > 180) rotat -= 360; 
        else if (rotat < -180) rotat += 360;
        
        nowrot += rotat;
        //поворот карусели
        carusel.style.transform = `perspective(2000px) rotateY(${nowrot}deg)`;

        //изменение х-к картинки
        change_Brightness();

    }
})