
export async function listarModelos(vehicleType, brandId, modelId, yearId){
    let endpoint = `https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`
    try {
        let response = await fetch (endpoint);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`)
    }   
}