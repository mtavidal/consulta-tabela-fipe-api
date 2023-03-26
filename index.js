import {consultarCarro, listarMarcas, listarModelos, listarAnos} from "./crud.js";

let form = document.getElementById('formCampo');

const buscarMarcaPorTipo= document.getElementById("tipo");
buscarMarcaPorTipo.onchange = async ()  => {
    let tipo = buscarMarcaPorTipo.value;
    let marcas = await listarMarcas(tipo);
    let selectMarca = document.getElementById("marca");
    selectMarca.disabled = false;
    selectMarca.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < marcas.length; index++) {
        selectMarca.innerHTML += ` 
            <option value="${marcas[index].codigo}">${marcas[index].nome}</option>
        `
    }
    $('#marca').selectpicker('refresh');
}

const buscarModeloPorMarca= document.getElementById("marca");
buscarModeloPorMarca.onchange = async ()  => {
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelos = await listarModelos(tipo, marca);
    let selectModelo = document.getElementById("modelo");
    selectModelo.disabled = false;
    selectModelo.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < modelos.modelos.length; index++) {
        selectModelo.innerHTML += ` 
            <option value="${modelos.modelos[index].codigo}">${modelos.modelos[index].nome}</option>
        `
    }
    $('#modelo').selectpicker('refresh');
}

const buscarAnoPorModelo= document.getElementById("modelo");
buscarAnoPorModelo.onchange = async ()  => {
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelo = buscarAnoPorModelo.value;
    let anos = await listarAnos(tipo, marca, modelo);
    let selectAno = document.getElementById("ano");
    selectAno.disabled = false;
    selectAno.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < anos.length; index++) {
        selectAno.innerHTML += ` 
            <option value="${anos[index].codigo}">${anos[index].nome}</option>
        `
    }
    $('#ano').selectpicker('refresh');
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
    let divDadosCarro = document.getElementById("dadosCarro");
    divDadosCarro.innerHTML = `
        <div id = "card">
            <h1>Marca: ${dadosConsulta.Marca}</h1>
            <h1>Modelo: ${dadosConsulta.Modelo}</h1>
            <h1>Ano: ${ano}</h1>
            <h1>Valor: ${dadosConsulta.Valor}</h1>
            <h4>Mês de referência: ${dadosConsulta.MesReferencia}</h4>
        </div>
    `
    limparCampos();
})

function limparCampos(){
    buscarMarcaPorTipo.value = "";
    buscarModeloPorMarca.value = "";
    buscarAnoPorModelo.value = "";
    buscarCarroPorAno.value = "";
    let selectMarca = document.getElementById("marca");
    selectMarca.disabled = true;
    let selectModelo = document.getElementById("modelo");
    selectModelo.disabled = true;
    let selectAno = document.getElementById("ano");
    selectAno.disabled = true;
    
    $('#marca option').remove();
    $('#modelo option').remove();
    $('#ano option').remove();
    $('select').selectpicker('refresh');
}



