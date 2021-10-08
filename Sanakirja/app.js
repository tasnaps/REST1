const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('Sanakirja'))
app.use(express.json());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

let sanakirja = [];

//sanakirjan lukeminen
app.get('/sanakirja', (req, res) => {
    const aukiKirja = fs.readFileSync('./sanakirja.txt', {encoding: 'utf-8', flag:'r'});
    const splitlines = aukiKirja.split(/\r?\n/);
    console.log(splitlines);
    splitlines.forEach((rivi) => {
        const sana = rivi.split(" "); // sanat taulukkoon
        const lisays = {fin: sana[0], eng:sana[1]};
        sanakirja.push(lisays);
    })
    res.json(sanakirja);
});

//spesifin sanan hakeminen sanakirjasta.
  app.get('/sanakirja/:fin', function(req, res){
    const arvo = req.params.fin;
    console.log(arvo); //auto
    const aukiKirja = fs.readFileSync('./sanakirja.txt', {encoding: 'utf-8', flag:'r'});
    const splitlines = aukiKirja.split(/\r?\n/);
    splitlines.forEach((rivi) => {
        const sana = rivi.split(" "); // sanat taulukkoon
        const lisays = {fin: sana[0], eng:sana[1]};
        sanakirja.push(lisays);
    })
      console.log(sanakirja);//[{fin: 'auto', eng: 'car'}]
      sanakirja.forEach(pari => {
          if(pari.fin.valueOf()===arvo){
              res.send(pari.fin + " " + pari.eng);
          }else{
              res.send("Arvoa ei sanakirjassa")
          }
      })
})


//sanakirjaan kirjoittaminen
app.post("/sanakirja/:sana", (req, res) => {
    console.log(req.params.sana);
    const lisays = req.params.sana;
    fs.writeFileSync('./sanakirja.txt',"\n" + lisays ,{encoding: 'utf-8', flag:'a+'});
    res.send("Sana lisätty" );
})

app.listen(3000, () =>{
    console.log("Kuunnellaan:")
})





