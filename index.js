const express = require('Express');
const app = express();

app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/index.html");
})



app.listen(4000, function(){
    console.log("FUNCIONA");    
});

