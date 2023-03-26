import { consultarCarro, listarMarcas, listarModelos, listarAnos } from "./crud.js";

let form = document.getElementById('formCampo');

const buscarMarcaPorTipo = document.getElementById("tipo");
buscarMarcaPorTipo.onchange = async () => {
    let tipo = buscarMarcaPorTipo.value;
    let marcas = await listarMarcas(tipo);
    let selectMarca = document.getElementById("marca");
    selectMarca.disabled = false;
    let avisoTipo = document.getElementById("avisoTipo");
    avisoTipo.textContent = " ";
    selectMarca.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < marcas.length; index++) {
        selectMarca.innerHTML += ` 
            <option value="${marcas[index].codigo}">${marcas[index].nome}</option>
        `
    }
    $('#marca').selectpicker('refresh');
}

const buscarModeloPorMarca = document.getElementById("marca");
buscarModeloPorMarca.onchange = async () => {
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelos = await listarModelos(tipo, marca);
    let selectModelo = document.getElementById("modelo");
    selectModelo.disabled = false;
    let avisoMarca = document.getElementById("avisoMarca");
    avisoMarca.textContent = " ";
    selectModelo.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < modelos.modelos.length; index++) {
        selectModelo.innerHTML += ` 
            <option value="${modelos.modelos[index].codigo}">${modelos.modelos[index].nome}</option>
        `
    }
    $('#modelo').selectpicker('refresh');
}

const buscarAnoPorModelo = document.getElementById("modelo");
buscarAnoPorModelo.onchange = async () => {
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelo = buscarAnoPorModelo.value;
    let anos = await listarAnos(tipo, marca, modelo);
    let selectAno = document.getElementById("ano");
    selectAno.disabled = false;
    let avisoModelo = document.getElementById("avisoModelo");
    avisoModelo.textContent = " ";
    selectAno.innerHTML = `<option value="" disabled selected>selecione</option>`;
    for (let index = 0; index < anos.length; index++) {
        selectAno.innerHTML += ` 
            <option value="${anos[index].codigo}">${anos[index].nome}</option>
        `
    }
    $('#ano').selectpicker('refresh');
}

const buscarCarroPorAno = document.getElementById("ano");

buscarCarroPorAno.onchange = async () => {
    let avisoAno = document.getElementById("avisoAno");
    avisoAno.textContent = " ";
}


form.addEventListener('submit', async event => {
    event.preventDefault();
    let tipo = buscarMarcaPorTipo.value;
    let marca = buscarModeloPorMarca.value;
    let modelo = buscarAnoPorModelo.value;
    let ano = buscarCarroPorAno.value;
    let avisoAno = document.getElementById("avisoAno");
    let avisoMarca = document.getElementById("avisoMarca");
    let avisoModelo = document.getElementById("avisoModelo");
    let avisoTipo = document.getElementById("avisoTipo");
    avisoTipo.textContent = " ";
    avisoMarca.textContent = " ";
    avisoModelo.textContent = " ";
    avisoAno.textContent = " ";
    if (tipo === "") {
        avisoTipo.textContent = "Selecione o tipo do veículo";
    }
    if (marca === "") {
        avisoMarca.textContent = "Selecione a marca do veículo";
    }
    if (modelo === "") {
        avisoModelo.textContent = "Selecione o modelo do veículo";
    }
    if (ano === "") {
        avisoAno.textContent = "Selecione o ano do veículo";
    } else {
        let dadosConsulta = await consultarCarro(tipo, marca, modelo, ano);
        form.style.display ="none";
        let divDadosCarro = document.getElementById("dadosCarro");
        avisoAno.textContent = " ";
        divDadosCarro.innerHTML = `
            <div id = "card">
                <h1><b>Marca:</b> ${dadosConsulta.Marca}</h1>
                <h1><b>Modelo:</b> ${dadosConsulta.Modelo}</h1>
                <h1><b>Ano:</b> ${ano}</h1>
                <h1><b>Valor:</b> ${dadosConsulta.Valor}</h1>
                <h4><b>Mês de referência:</b> ${dadosConsulta.MesReferencia}</h4>
                <button id="btnOutraConsulta">Fazer outra consulta</button>
            </div>
        `
        let btnPesquisa = document.getElementById("btnOutraConsulta");
        btnPesquisa.onclick = () => {
            form.style.display ="flex";
            divDadosCarro.textContent = "";
        }
        
        limparCampos();
    }
})

function limparCampos() {
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



