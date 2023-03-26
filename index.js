const express = require('Express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/index.html");
})


let datosArray = [];
fs.readFile('datos.json', 'utf8', (err, data) => {
    if (err) throw err;
    datosArray = JSON.parse(data);
});

app.post('/guardar', (req, res) => {
    const nuevoDato = req.body;
    const index = datosArray.findIndex(dato => dato.slot === nuevoDato.slot);

    if (index !== -1) {
        // Si se encontró un dato con el mismo valor de slot, reemplazarlo
        datosArray[index] = nuevoDato;
      } else {
        // Si no se encontró un dato con el mismo valor de slot, agregar el nuevo dato al final
        datosArray.push(nuevoDato);
      }
    
    // Escribe el archivo completo con los datos actualizados
    fs.writeFile('datos.json', JSON.stringify(datosArray), (err) => {
    if (err) throw err;
    res.send('Datos guardados');
    });
});
app.post('/cargar', (req, res) => {
    const slot = req.body;
    const datos = datosArray.find(dato => dato.slot === slot.slot);
    if (datos) {
        res.send(datos);
     } else {
        res.status(404).send('No se encontraron datos para el slot especificado');
    }
});
app.get('/json', (req, res)=>{
    res.json(datosArray);
});

    


app.listen(4000, function(){
    console.log("FUNCIONA");    
});

