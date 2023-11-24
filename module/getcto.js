const promises = [];
const table = $("#tablaCasos").DataTable();
let data = table.context[0].json;




async function getHTML(idReg) {
  let response = await fetch(`ajax/soporte_visita_mostrarinfo.php?cod_id_reg=${idReg}`);
  let html = await response.text();
  let parse = new DOMParser();
  let doc = parse.parseFromString(html, 'text/html');
  let cto = doc.getElementById('txt_cto');
  return cto.value;
}

data.forEach((e) => e.motivo === "LOS ROJO" ? promises.push(getHTML(e.id_reg)) : "");

Promise.all(promises)
  .then(results => {
    console.log(results)
    // results = results.reduce((acc, curr) => { (curr in acc) ? acc[curr]++ : acc[curr] = 1 }, {})
    results = results.reduce((acc, curr) => {
      if (curr in acc) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});
    const keys = Object.keys(results);
    const div = document.querySelector('.extension.content._getcto .resultado');

    keys.forEach((key) => {
      const value = results[key];
      const item = document.createElement('div');
      const dataElement = document.createElement('p');
      // const valueElement = document.createElement('p');

      dataElement.textContent = `${key}: ${value}`;
      // valueElement.textContent = value;
      item.appendChild(dataElement);
      div.appendChild(item);
    });
  })
  .catch(error => {
    console.log(error)
  })
