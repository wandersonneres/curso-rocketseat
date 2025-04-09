export async function jsonBodyHandler(request, response) {
    const buffers = [] 

    //coleta os chunks de dados da requisição
    for await (const chunk of request) {
        buffers.push(chunk)    
    }
    try {
        //concatena os chunk e converte para string. Em seguida, converte a string para um json
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
        request.body = null
    }

    response.setHeader("Content-Type","application/json")
}


