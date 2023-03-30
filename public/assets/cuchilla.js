const circulo_cuchilla = document.getElementById("circulo_cuchilla");   
const btns = document.querySelectorAll(".btn");      
const torture_room = document.getElementById("torture_room"); 
const div_dinero = document.getElementById("dinero"); 
const div_dps = document.getElementById("dps"); 
const div_golpes = document.getElementById("golpes"); 
const cuchillo = document.getElementById("cuchillo"); 
const furry = document.getElementById("furry"); 
const ajustes = document.getElementById("ajustes"); 
const pantalla_ajustes = document.getElementById("pantalla_ajustes"); 
const add_cuchilla = document.getElementById("add_cuchilla");
const mejorar_cuchillo = document.getElementById("mejorar_cuchillo")
//cargar
const slots = document.querySelectorAll('.slot');
const nombres = document.querySelectorAll('.nombre');
const contenidos = document.querySelectorAll('.contenido');

const opciones = document.querySelectorAll('.opcion');

let cuchillas = 0;
let lvl_cuchillo = 1;
let dinero = 0;
let dps = 0;
let golpes = 0;
let active = -1;



// Definir la función que se ejecutará 60 veces por segundo
function actualizar() {
    // Código a ejecutar
    dinero = dinero + dps*16.67/1000;
    golpes = golpes + dps*16.67/1000;
    mostrar_estadisticas();

    //cambiar furrysprite
    if(golpes > 50){
        furry.classList = "dos";
    }
    if(golpes > 100){
        furry.classList = "tres";
    }
}
  
  // Configurar la ejecución de la función 60 veces por segundo
  setInterval(actualizar, 16.67);








torture_room.onmousedown= function(){
    dinero+= 1 * Math.pow(2, (lvl_cuchillo-1));
    golpes+= 1 * Math.pow(2, (lvl_cuchillo-1));
    cuchillo.classList = "cerca";

    mostrar_estadisticas();
}
torture_room.onmouseup= function(){
    cuchillo.classList = "lejos";

}
btns[0].addEventListener("click", function(){
    if(dinero >= 10*(cuchillas+1)){
        circulo_cuchilla.innerHTML = "";
        cuchillas++;
        dps += 0.5;
        dinero = dinero -10*(cuchillas);
        btns[0].innerHTML = "Añadir cuchilla("+(10*(cuchillas+1))+")";

        for(let i=0; i<cuchillas;i++){
            const cuchilla = new Cuchilla(360*i/cuchillas);
        }
        mostrar_estadisticas();
    }
    
});
btns[1].addEventListener("click", function(){
    if(dinero >= (200 * Math.pow(2, (lvl_cuchillo-1)))){
        lvl_cuchillo++;
        dinero = dinero -(200 * Math.pow(2, (lvl_cuchillo-2)));
        btns[1].innerHTML = "Mejorar cuchillo("+(200 * Math.pow(2, (lvl_cuchillo-1)))+")";
        mostrar_estadisticas();
    }
    
});


class Cuchilla{
    constructor(degrees){
        this.degrees = degrees;
        this.div = document.createElement("div");
        this.div.classList.add("cuchilla");
        this.div.style.transform = "rotate("+this.degrees+"deg)";

        circulo_cuchilla.appendChild(this.div);
    }
    

}
function mostrar_estadisticas(){
    div_dinero.innerHTML = "Dinero:"+Math.floor(dinero);
    div_dps.innerHTML = "DPS: "+Math.floor(dps*100)/100;
    div_golpes.innerHTML = "Golpes: "+Math.floor(golpes);
}

ajustes.addEventListener("click", function(){
    pantalla_ajustes.classList.toggle("active");
    for(let e=0;e<slots.length;e++){
        slots[e].classList.remove("active");
    }
    active = -1;
});
for(let i=0;i<slots.length;i++){
    slots[i].addEventListener("click", function(){
        for(let e=0;e<slots.length;e++){
            slots[e].classList.remove("active");
        }
        slots[i].classList.add("active");
        active = i;
        console.log(active);
    });
}
//guardar
opciones[0].addEventListener("click", function(){
    if(active>=0){
        console.log("okay");
        const datos = {slot: active, nombre: 'a', dinero: dinero};
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/guardar');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                reload_slots();
            }
        };
        xhr.send(JSON.stringify(datos));
    }
});
//cargar
opciones[1].addEventListener("click", function(){
    if(active>=0){
        console.log("okay");
        const slot = {slot:active};

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/cargar');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function(){
            if(xhr.status == 200){  //Aqui se obtiene la respuesta del servidor
                const datos = JSON.parse(xhr.responseText);
                console.log(datos);
                //pasar datos
                dinero = datos.dinero;
             }else {
                console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(slot));
    }
    
});
//vacio/lleno
window.onload = function(){

    reload_slots();
        
}
function reload_slots(){
    console.log("okay");
        const slot = {slot:active};

        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/json');
        xhr.onload = function(){
            if(xhr.status == 200){  //Aqui se obtiene la respuesta del servidor
                const datos = JSON.parse(xhr.responseText);

                for(let i=0; i<datos.length; i++){
                    if(datos[i].nombre != ""){
                        nombres[i].innerHTML = datos[i].nombre;
                        contenidos[i].innerHTML = "dinero: "+datos[i].dinero;
                    }
                }
             }else {
                console.log(xhr.responseText);
            }
        };
        xhr.send();
}