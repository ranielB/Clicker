const circulo_cuchilla = document.getElementById("circulo_cuchilla");   
const btns = document.querySelectorAll(".btn");      
const torture_room = document.getElementById("torture_room"); 
const div_dinero = document.getElementById("dinero"); 
const div_dps = document.getElementById("dps"); 
const div_golpes = document.getElementById("golpes"); 
const cuchillo = document.getElementById("cuchillo"); 
const furry = document.getElementById("furry"); 

let cuchillas = 0;
let dinero = 0;
let dps = 0;
let golpes = 0;


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
    dinero++;
    golpes++;
    cuchillo.classList = "cerca";

    mostrar_estadisticas();
}
torture_room.onmouseup= function(){
    cuchillo.classList = "lejos";

}
btns[0].addEventListener("click", function(){
    if(dinero >= 10){
        circulo_cuchilla.innerHTML = "";
        cuchillas++;
        dps += 0.5;
        dinero = dinero -10;

        for(let i=0; i<cuchillas;i++){
            const cuchilla = new Cuchilla(360*i/cuchillas);
        }
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