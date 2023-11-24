const llenadoSelect = (caso = 36, tip = ['244', 'Agendamiento'], mot = ['635', 'Se agenda llamada']) => {
    console.log(caso, tip, mot);
    let caseSupp = document.getElementById("cb_tipi_caso_soporte");
    let tipo = document.getElementById("cb_tipo_tipi_cerrado");
    let motivo = document.getElementById("cb_motivo_tipi_cerrado");
    let opt1 = document.createElement("option");
    let opt2 = document.createElement("option");
    caseSupp.value = caso;
    opt1.value = tip[0];
    opt1.text = tip[1];
    opt1.selected = true;
    tipo.add(opt1);
    opt2.value = mot[0];
    opt2.text = mot[1];
    opt2.selected = true;
    motivo.add(opt2);
}
