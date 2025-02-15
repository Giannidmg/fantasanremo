const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const fileupdate = urlParams.has("file");
console.log("file update mode: ", fileupdate);

if (fileupdate == true) {
  document.querySelector(".file").style.setProperty("display", "flex");
}

logPunteggi();








async function logPunteggi() {
  const response = await fetch("https://fantasanremo.com/data/1739591737961/artists.json");
  const punteggi = await response.json();
  console.log(punteggi)
  fetch('./database/partecipanti.json').then((response) => response.json()).then((json) => {
  
    var temp;
    var i = 0
    for(i; i<Object.keys(json.Partecipanti).length; i++){
      punteggi.forEach(e => {
        if (e._id == json.Partecipanti[i].Cantante1) {
          json.Partecipanti[i].Cantante1 = e
        }
      })
      punteggi.forEach(e => {
        if (e._id == json.Partecipanti[i].Cantante2) {
          json.Partecipanti[i].Cantante2 = e
        }
      })
      punteggi.forEach(e => {
        if (e._id == json.Partecipanti[i].Cantante3) {
          json.Partecipanti[i].Cantante3 = e
        }
      })
      punteggi.forEach(e => {
        if (e._id == json.Partecipanti[i].Cantante4) {
          json.Partecipanti[i].Cantante4 = e
        }
      })
      punteggi.forEach(e => {
        if (e._id == json.Partecipanti[i].Cantante5) {
          json.Partecipanti[i].Cantante5 = e

        }
      });
      console.log(json.Partecipanti[i])
    }

    var y = 0;

    for(y; y<Object.keys(json.Partecipanti).length; y++){
      tot = json.Partecipanti[y].Cantante1.totalPointsCaptain + 
            json.Partecipanti[y].Cantante2.totalPoints +
            json.Partecipanti[y].Cantante3.totalPoints +
            json.Partecipanti[y].Cantante4.totalPoints +
            json.Partecipanti[y].Cantante5.totalPoints;
            json.Partecipanti[y].totale = tot;
    }

    console.log(json.Partecipanti)

    json.Partecipanti = json.Partecipanti.sort((a, b) => {
      if (a.totale > b.totale) {
        return -1;
      }
    });

    console.log(json.Partecipanti)
  
    var j = 0;
    for(j; j<Object.keys(json.Partecipanti).length; j++){
      document.getElementById("foto".concat(j)).src = "./assets/".concat(json.Partecipanti[j].codice).concat(".png")
      document.getElementById("name".concat(j)).innerHTML = json.Partecipanti[j].Nome
      document.getElementById("surname".concat(j)).innerHTML = json.Partecipanti[j].Cognome
      document.getElementById("nomesquadratxt".concat(j)).innerHTML = json.Partecipanti[j].NomeSquadra
      document.getElementById("cantante1_".concat(j)).innerHTML = json.Partecipanti[j].Cantante1.name.charAt(0).toUpperCase() + json.Partecipanti[j].Cantante1.name.slice(1).toLowerCase();
      document.getElementById("punteggio1_".concat(j)).innerHTML = json.Partecipanti[j].Cantante1.totalPointsCaptain + " pt."
      document.getElementById("cantante2_".concat(j)).innerHTML = json.Partecipanti[j].Cantante2.name.charAt(0).toUpperCase() + json.Partecipanti[j].Cantante2.name.slice(1).toLowerCase();
      document.getElementById("punteggio2_".concat(j)).innerHTML = json.Partecipanti[j].Cantante2.totalPoints + " pt."
      document.getElementById("cantante3_".concat(j)).innerHTML = json.Partecipanti[j].Cantante3.name.charAt(0).toUpperCase() + json.Partecipanti[j].Cantante3.name.slice(1).toLowerCase();
      document.getElementById("punteggio3_".concat(j)).innerHTML = json.Partecipanti[j].Cantante3.totalPoints + " pt."
      document.getElementById("cantante4_".concat(j)).innerHTML = json.Partecipanti[j].Cantante4.name.charAt(0).toUpperCase() + json.Partecipanti[j].Cantante4.name.slice(1).toLowerCase();
      document.getElementById("punteggio4_".concat(j)).innerHTML = json.Partecipanti[j].Cantante4.totalPoints + " pt."
      document.getElementById("cantante5_".concat(j)).innerHTML = json.Partecipanti[j].Cantante5.name.charAt(0).toUpperCase() + json.Partecipanti[j].Cantante5.name.slice(1).toLowerCase();
      document.getElementById("punteggio5_".concat(j)).innerHTML = json.Partecipanti[j].Cantante5.totalPoints + " pt."
      document.getElementById("punteggiotot_".concat(j)).innerHTML = json.Partecipanti[j].totale + " pt."
    }
  });

}










// Excel uploader

var selectedFile;
document
  .getElementById("fileUpload")
  .addEventListener("change", function (event) {
    selectedFile = event.target.files[0];
    console.log(selectedFile);
  });

document.getElementById("uploadExcel").addEventListener("click", function () {
  if (selectedFile) {
    console.log("Analisi avviata");
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var data = event.target.result;

      var workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        let jsonObject = JSON.stringify(rowObject);
        document.getElementById("jsonData").innerHTML = jsonObject;
        console.log(jsonObject);
      });
    };
    fileReader.readAsBinaryString(selectedFile);
  }
});

