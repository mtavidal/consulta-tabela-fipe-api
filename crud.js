
export async function consultarCarro(tipo, codigoMarca, codigoModelo, ano){
    let endpoint = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${ano}`
    try {
        let response = await fetch (endpoint);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`)
    }   
}
export async function listarMarcas(tipo){
    let endpoint = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`
    try {
        let response = await fetch (endpoint);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`)
    }   
}

export async function listarModelos(tipo, codigoMarca){
    let endpoint = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigoMarca}/modelos`
    try {
        let response = await fetch (endpoint);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`)
    }   
}

export async function listarAnos(tipo, codigoMarca, codigoModelo){
    let endpoint = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`
    try {
        let response = await fetch (endpoint);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`)
    }   
}
