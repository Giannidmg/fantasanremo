const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const fileupdate = urlParams.has("file");
console.log("file update mode: ", fileupdate);

if (fileupdate == true) {
  document.querySelector(".file").style.setProperty("display", "flex");
}


fetch('./database/punteggi.json').then((response) => response.json()).then((json) => {
  
  var temp
  var i = 0
  for(i; i<Object.keys(json.Partecipanti).length; i++){
    document.getElementById("foto".concat(i)).src = "./assets/".concat(json.Partecipanti[i].codice).concat(".png")
    document.getElementById("name".concat(i)).innerHTML = json.Partecipanti[i].Nome
    document.getElementById("surname".concat(i)).innerHTML = json.Partecipanti[i].Cognome
    document.getElementById("nomesquadratxt".concat(i)).innerHTML = json.Partecipanti[i].NomeSquadra
    document.getElementById("cantante1_".concat(i)).innerHTML = json.Partecipanti[i].Cantante1
    document.getElementById("punteggio1_".concat(i)).innerHTML = json.Partecipanti[i].pt1
    document.getElementById("cantante2_".concat(i)).innerHTML = json.Partecipanti[i].Cantante2
    document.getElementById("punteggio2_".concat(i)).innerHTML = json.Partecipanti[i].pt2
    document.getElementById("cantante3_".concat(i)).innerHTML = json.Partecipanti[i].Cantante3
    document.getElementById("punteggio3_".concat(i)).innerHTML = json.Partecipanti[i].pt3
    document.getElementById("cantante4_".concat(i)).innerHTML = json.Partecipanti[i].Cantante4
    document.getElementById("punteggio4_".concat(i)).innerHTML = json.Partecipanti[i].pt4
    document.getElementById("cantante5_".concat(i)).innerHTML = json.Partecipanti[i].Cantante5
    document.getElementById("punteggio5_".concat(i)).innerHTML = json.Partecipanti[i].pt5
    document.getElementById("punteggiotot_".concat(i)).innerHTML = json.Partecipanti[i].Totale
  }

});










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

