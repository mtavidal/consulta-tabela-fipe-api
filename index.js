import {listarModelos} from "./crud.js";

let form = document.getElementById('formCampo');

form.addEventListener('submit', async event => {
    event.preventDefault();
    let vehicleType = document.getElementById('tipo').value;
    let brandId = document.getElementById('marca').value;
    let modelId = document.getElementById('modelo').value;
    let yearId = document.getElementById('data').value;
    let dadosConsulta = await listarModelos(vehicleType, brandId, modelId, yearId);
    console.log(dadosConsulta);
})

