import {consultarCarro, listarMarcas, listarModelos, listarAnos} from "./crud.js";

let form = document.getElementById('formCampo');

const buscarMarcaPorTipo= document.getElementById("tipo");
buscarMarcaPorTipo.onchange = async ()  => {
    let tipo = buscarMarcaPorTipo.value;
    let marcas = await listarMarcas(tipo);
    let selectMarca = document.getElementById("marca");
    selectMarca.style.display = "flex";
    selectMarca.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < marcas.length; index++) {
        selectMarca.innerHTML += ` 
            <option value="${marcas[index].codigo}">${marcas[index].nome}</option>
        `
    }
}

const buscarModeloPorMarca= document.getElementById("marca");
buscarModeloPorMarca.onchange = async ()  => {
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelos = await listarModelos(tipo, marca);
    let selectModelo = document.getElementById("modelo");
    selectModelo.style.display = "flex";
    selectModelo.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < modelos.modelos.length; index++) {
        selectModelo.innerHTML += ` 
            <option value="${modelos.modelos[index].codigo}">${modelos.modelos[index].nome}</option>
        `
    }
}

const buscarAnoPorModelo= document.getElementById("modelo");
buscarAnoPorModelo.onchange = async ()  => {
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelo = buscarAnoPorModelo.value;
    let anos = await listarAnos(tipo, marca, modelo);
    let selectAno = document.getElementById("ano");
    selectAno.style.display = "flex";
    selectAno.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < anos.length; index++) {
        selectAno.innerHTML += ` 
            <option value="${anos[index].codigo}">${anos[index].nome}</option>
        `
    }
}

const buscarCarroPorAno = document.getElementById("ano");
form.addEventListener('submit', async event => {
    event.preventDefault();
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelo = buscarAnoPorModelo.value;
    let ano = buscarCarroPorAno.value;
    let dadosConsulta = await consultarCarro(tipo, marca, modelo, ano);
    console.log(dadosConsulta);
})

